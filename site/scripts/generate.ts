import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { getAllData } from '../src/lib/icons';
import { getAllCategories } from '../src/lib/categories';

const generatedDir = join(process.cwd(), 'src', 'generated');

mkdirSync(generatedDir, { recursive: true });

(async () => {
  const [data, categories] = await Promise.all([
    getAllData({ withChildKeys: true }),
    getAllCategories(),
  ]);
  writeFileSync(
    join(generatedDir, 'data.ts'),
    `import { IconEntity } from '../types';
export default ${JSON.stringify(data, null, 2)} as IconEntity[]`
  );
  writeFileSync(
    join(generatedDir, 'categories.ts'),
    `import { Category } from '../types';
export default ${JSON.stringify(categories, null, 2)} as Category[]`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
