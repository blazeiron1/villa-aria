import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const dir = 'public/aria'
const MAX_WIDTH = 1920
const QUALITY = 80

const files = readdirSync(dir).filter((f) => {
  const ext = extname(f).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.avif', '.jfif'].includes(ext)) return false
  return /^(101|102|103|104|about|home|contact)/.test(f)
})

console.log(`Found ${files.length} gallery images to compress...\n`)

for (const file of files) {
  const input = join(dir, file)
  const ext = extname(file).toLowerCase()
  const base = basename(file, ext)
  // Always output as .jpg for consistency (except avif stays avif)
  const outExt = ext === '.avif' ? '.avif' : '.jpg'
  const output = join(dir, base + outExt)

  try {
    const before = statSync(input).size
    const img = sharp(input).resize({ width: MAX_WIDTH, withoutEnlargement: true })

    if (outExt === '.avif') {
      await img.avif({ quality: QUALITY }).toFile(output + '.tmp')
    } else {
      await img.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(output + '.tmp')
    }

    // Overwrite original with compressed version
    const { rename, unlink } = await import('fs/promises')
    // Remove original, rename tmp to original name
    await unlink(input)
    await rename(output + '.tmp', output)

    const after = statSync(output).size
    const saved = (((before - after) / before) * 100).toFixed(1)
    console.log(`  ${file}: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024).toFixed(0)}KB  (-${saved}%)`)
  } catch (err) {
    console.error(`  ERROR on ${file}:`, err.message)
  }
}

console.log('\nDone.')
