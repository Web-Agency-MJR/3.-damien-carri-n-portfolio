import galleryOneRaw from "./galleries/gallery-1.json";
import galleryTwoRaw from "./galleries/gallery-2.json";
import galleryThreeRaw from "./galleries/gallery-3.json";
import galleryFourRaw from "./galleries/gallery-4.json";

/** Raw shape of the extracted Wix JSON files. */
export interface RawGalleryFile {
  source?: string;
  items: RawGalleryItem[];
}

export interface RawGalleryItem {
  gallery: number;
  step?: number;
  visibleIndex: number;
  title: string;
  description?: string;
  imageUrl: string;
  wixFile?: string;
  width?: number | undefined;
  height?: number | undefined;
}

/** A single artwork as displayed by the site. Fields are only filled when the
 * source data states them unambiguously — nothing is inferred or invented. */
export interface GalleryWork {
  id: string;
  /** Original title, minus the trailing dimension parenthesis when present. */
  title: string;
  /** Verbatim description string from the source, when present. */
  info?: string | undefined;
  /** Technique / support tokens from the description, verbatim. */
  technique?: string | undefined;
  /** Dimensions found between parentheses in the original title. */
  dimensions?: string | undefined;
  /** Four-digit year found in the description. */
  year?: string | undefined;
  imageUrl: string;
  width?: number | undefined;
  height?: number | undefined;
}

export interface GalleryGroup {
  id: string;
  works: GalleryWork[];
}

export interface GalleryDefinition {
  id: string;
  label: string;
  groups: GalleryGroup[];
}

const DIMENSIONS_RE = /\(([^()]*\d+\s*[xX×]\s*\d+[^()]*)\)/;
const YEAR_RE = /^\d{4}$/;

function isExcluded(item: RawGalleryItem) {
  const t = (item.title ?? "").trim();
  if (!t) return false;
  // Wix cover/copyright placeholders, e.g. "DC ©", "© DibujoS...".
  return t.includes("©");
}

function parseWork(item: RawGalleryItem, key: string): GalleryWork {
  const rawTitle = (item.title ?? "").trim();
  const dimMatch = rawTitle.match(DIMENSIONS_RE);
  const dimensions = dimMatch?.[1]?.trim() || undefined;

  let title = rawTitle;
  if (dimMatch) title = rawTitle.replace(dimMatch[0], "").trim();
  title = title.replace(/\s*\.\s*$/, "").trim() || rawTitle;

  const info = item.description?.trim() || undefined;

  let year: string | undefined;
  let technique: string | undefined;
  if (info) {
    const tokens = info
      .replace(/\.\s*$/, "")
      .split("/")
      .map((t) => t.trim())
      .filter(Boolean);
    const rest: string[] = [];
    for (const token of tokens) {
      if (YEAR_RE.test(token)) year = token;
      else rest.push(token);
    }
    if (rest.length) technique = rest.join(" / ");
  }

  return {
    id: key,
    title,
    info,
    technique,
    dimensions,
    year,
    imageUrl: item.imageUrl,
    width: item.width,
    height: item.height,
  };
}

/** Groups items by their original `gallery` field (one group per original
 * Wix carousel) and preserves `visibleIndex` ordering inside each group. */
export function buildGroups(raw: RawGalleryFile, galleryId: string): GalleryGroup[] {
  const buckets = new Map<number, RawGalleryItem[]>();
  const seen = new Set<string>();

  for (const item of raw.items) {
    if (!item?.imageUrl || isExcluded(item)) continue;
    if (seen.has(item.imageUrl)) continue;
    seen.add(item.imageUrl);
    const list = buckets.get(item.gallery) ?? [];
    list.push(item);
    buckets.set(item.gallery, list);
  }

  return [...buckets.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([groupIndex, items]) => ({
      id: `${galleryId}-g${groupIndex}`,
      works: items
        .slice()
        .sort((a, b) => a.visibleIndex - b.visibleIndex)
        .map((item, i) => parseWork(item, `${galleryId}-g${groupIndex}-${i}`)),
    }));
}

function defineGallery(index: number, raw?: RawGalleryFile): GalleryDefinition {
  const id = `gallery-${index}`;
  const labels = [
    "GALLERY I (2D)",
    "GALLERY II (2D)",
    "GALLERY III (3D)",
    "GALLERY IV (2D)",
    "GALLERY V (GOLD)",
    "GALLERY VI (3D)",
    "GALLERY VII (3D)",
    "GALLERY VIII (3D)",
  ];
  return {
    id,
    label: labels[index - 1] ?? `Gallery ${index}`,
    groups: raw ? buildGroups(raw, id) : [],
  };
}

/** Registry — drop a new extracted JSON here to activate Gallery 2–8. */
export const galleries: GalleryDefinition[] = [
  defineGallery(1, galleryOneRaw as RawGalleryFile),
  defineGallery(2, galleryTwoRaw as RawGalleryFile),
  defineGallery(3, galleryThreeRaw as RawGalleryFile),
  defineGallery(4, galleryFourRaw as RawGalleryFile),
  defineGallery(5),
  defineGallery(6),
  defineGallery(7),
  defineGallery(8),
];

export const ALL_WORKS_ID = "all";

export function galleryWorks(gallery: GalleryDefinition): GalleryWork[] {
  return gallery.groups.flatMap((g) => g.works);
}

/** Up to `perGallery` representative works per gallery, deduped by image. */
export function summaryWorks(perGallery = 5): GalleryWork[] {
  const seen = new Set<string>();
  const out: GalleryWork[] = [];
  for (const gallery of galleries) {
    let taken = 0;
    for (const work of galleryWorks(gallery)) {
      if (taken >= perGallery) break;
      if (seen.has(work.imageUrl)) continue;
      seen.add(work.imageUrl);
      out.push(work);
      taken += 1;
    }
  }
  return out;
}
