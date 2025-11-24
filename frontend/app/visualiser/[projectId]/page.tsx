import { notFound } from 'next/navigation';

import { PageHeader } from '../../../components/page-header';
import { VisualiserApp, type Stroke, type VisualiserProjectState } from '../../../components/visualiser/visualiser-app';

type VisualiserApiResponse = {
  id: string;
  title: string;
  project_json: unknown;
  thumbnail_url?: string | null;
};

const getApiBaseUrl = () => {
  const envProcess = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return envProcess?.env?.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
};

const normaliseStrokes = (value: unknown): Stroke[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null;
      const candidate = entry as Record<string, unknown>;
      const x = typeof candidate.x === 'number' ? candidate.x : null;
      const y = typeof candidate.y === 'number' ? candidate.y : null;
      const size = typeof candidate.size === 'number' ? candidate.size : null;
      const color = typeof candidate.color === 'string' ? candidate.color : null;
      if (x === null || y === null || size === null || color === null) return null;
      return { x, y, size, color } satisfies Stroke;
    })
    .filter((stroke): stroke is Stroke => Boolean(stroke));
};

const normaliseProject = (project: VisualiserApiResponse): VisualiserProjectState => {
  const payload = (project.project_json && typeof project.project_json === 'object' ? project.project_json : {}) as Record<string, unknown>;
  const strokes = normaliseStrokes(payload.strokes);
  const brushSize = typeof payload.brushSize === 'number' ? payload.brushSize : undefined;
  const brushColor = typeof payload.brushColor === 'string' ? payload.brushColor : undefined;
  const imageSource = typeof payload.imageSource === 'string' ? payload.imageSource : undefined;
  const imageWidth = typeof payload.imageWidth === 'number' ? payload.imageWidth : undefined;
  const imageHeight = typeof payload.imageHeight === 'number' ? payload.imageHeight : undefined;

  return {
    id: project.id,
    title: project.title,
    thumbnail_url: project.thumbnail_url ?? null,
    project_json: {
      strokes,
      brushSize,
      brushColor,
      imageSource,
      imageWidth,
      imageHeight
    }
  } satisfies VisualiserProjectState;
};

async function fetchProject(projectId: string): Promise<VisualiserProjectState | null> {
  const response = await fetch(`${getApiBaseUrl()}/visualiser/${projectId}`, { cache: 'no-store' });
  if (!response.ok) {
    return null;
  }
  const payload = (await response.json()) as { data?: VisualiserApiResponse };
  if (!payload.data) {
    return null;
  }
  return normaliseProject(payload.data);
}

export default async function VisualiserProjectPage({ params }: { params: { projectId: string } }) {
  const project = await fetchProject(params.projectId);
  if (!project) {
    notFound();
  }
  const projectState = project as VisualiserProjectState;

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        eyebrow="Master Brush Virtual Studio"
        title={projectState.title}
        description="Invite your client to continue exploring the palette or tweak the design below."
      />
      <VisualiserApp initialProject={projectState} />
    </div>
  );
}
