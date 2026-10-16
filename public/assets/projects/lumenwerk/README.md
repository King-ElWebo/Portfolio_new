# Production media

Store stable local project assets here. Record assignments, alt text, focal points, licenses, and mobile crops in [`docs/project/CONTENT.md`](../../docs/project/CONTENT.md).

Raster originals (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`) are build inputs. `pnpm build` generates width-specific WebP files in the ignored `responsive/` directory; do not edit or commit those variants. Use simple stable file names and sufficiently large originals. The shared widths are in `src/lib/image-widths.json`; the custom `next/image` loader emits local `srcset` URLs. Give every image accurate `sizes`, prioritize only visible lead images, and keep offscreen images lazy. Review crops and file sizes at mobile and desktop widths. See the [Cloudflare static-media contract](../../docs/system/CLOUDFLARE.md#responsive-local-media).
