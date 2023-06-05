import Canvas from 'canvas';
import { DOMParser } from 'xmldom';
import { Canvg, presets } from 'canvg';

const preset = presets.node({ DOMParser, canvas: Canvas, fetch });

const createRasterizedIcon = (svg: string) => {
  const canvas = preset.createCanvas(24, 24);
  const ctx = canvas.getContext('2d');

  Canvg.fromString(ctx, svg, preset).render();

  return canvas;
};

export default async function handler(req, res) {
  const url = req.url.split('/');
  const svg = Buffer.from(url.at(-1).slice(0, -4), 'base64').toString('utf8');

  const size = 24 * 4;
  const canvas = preset.createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, size, size);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(createRasterizedIcon(svg), 0, 0, size, size);

  res.setHeader('Cache-Control', 'public,max-age=31536000');
  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(canvas.toBuffer());
}
