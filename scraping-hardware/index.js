import { chromium } from 'playwright-chromium'

let browser = false

main(process.argv[2])

async function main (search) {
  if (!browser) browser = await chromium.launch()

  const items = Promise.all([
    compragamer(search),
    tryhardware(search),
    fullh4rd(search),
    maximus(search),
    mexx(search),
    malditohard(search)
  ]).then((results) => {
    const sortedItems = results.reduce((acc, curr) => {
      acc.push(...curr)
      return acc
    }, []).sort((a, b) => {
      a = parseInt(a.price.split('$')[1].replace(/ /g, '').replace('.', ''))
      b = parseInt(b.price.split('$')[1].replace(/ /g, '').replace('.', ''))
      return b - a
    })
    browser.close()
    return sortedItems
  })
  console.log(await items)
}

async function malditohard (search) { // div.mb-2.card-style-movile
  const page = await browser.newPage({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36' })
  try {
    await page.goto('https://www.malditohard.com.ar/busqueda/' + search, {
      waitUntil: 'networkidle',
      timeout: 100000
    })
  } catch (e) {
    console.log('malditohard ❌')
    return []
  }
  const content = await page.$$('div.mb-2.card-style-movile')

  const items = []
  for (let i = 0; i < content.length; i++) {
    const value = (await content[i].innerText()).split('\n')
    const href = (await content[i].innerHTML()).split('href="')[1].split('"')[0]

    if (value[1].toLowerCase().includes(search.toLowerCase())) {
      items.push({
        name: value[2],
        price: value[3],
        link: 'https://www.malditohard.com.ar' + href
      })
    }
  }
  await page.close()
  console.log('malditohard ✔️')
  return items
}

async function tryhardware (search) { // div.product-wrapper
  const page = await browser.newPage({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36' })
  try {
    await page.goto('https://www.tryhardware.com.ar/?s=' + search + '&post_type=product&product_cat=0', {
      waitUntil: 'domcontentloaded',
      timeout: 100000
    })
  } catch (e) {
    console.log('tryhardware ❌')
    return []
  }
  const content = await page.$$('div.product-wrapper')
  const items = []
  for (let i = 0; i < content.length; i++) {
    const value = (await content[i].innerText()).split('\n')
    const href = (await content[i].innerHTML()).split('href="')[1].split('"')[0]

    if (value[1].toLowerCase().includes(search.toLowerCase())) {
      items.push({
        name: value[1],
        price: value[2].split(',')[0],
        link: href
      })
    }
  }
  await page.close()
  console.log('tryhardware ✔️')
  return items
}

async function mexx (search) {
  const page = await browser.newPage({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36' })
  try {
    await page.goto('https://www.mexx.com.ar/buscar/?p=' + search, {
      waitUntil: 'domcontentloaded',
      timeout: 100000
    })
  } catch (e) {
    console.log('mexx ❌')
    return []
  }
  const content = await page.$$('div.col-md-3.pull-left')
  const items = []
  for (let i = 0; i < content.length; i++) {
    const value = (await content[i].innerText()).split('\n')
    const href = (await content[i].innerHTML()).split('href="')[1].split('"')[0]

    if (value[1].toLowerCase().includes(search.toLowerCase())) {
      items.push({
        name: value[1],
        price: value[5],
        link: href
      })
    }
  }
  await page.close()
  console.log('mexx ✔️')
  return items
}

async function fullh4rd (search) {
  const page = await browser.newPage({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36' }, { timeout: 3000000 })
  try {
    await page.goto('https://www.fullh4rd.com.ar/cat/search' + search, {
      waitUntil: 'domcontentloaded'
    })
  } catch (e) {
    console.log('fullh4rd ❌')
    return []
  }

  const content = await page.$$('div.item.product-list')
  const items = []
  for (let i = 0; i < content.length; i++) {
    const value = (await content[i].innerText()).split('\n')
    const href = (await content[i].innerHTML()).split('href="')[1].split('"')[0]

    if (value[0].toLowerCase().includes(search.toLowerCase())) {
      items.push({
        name: value[0],
        price: value[1].split(' ')[0].split(',')[0],
        link: 'https://www.fullh4rd.com.ar/' + href
      })
    }
  }

  await page.close()
  console.log('fullh4rd ✔️')
  return items
}

async function maximus (search) {
  const page = await browser.newPage({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36' })
  try {
    await page.goto('https://www.maximus.com.ar/Productos/OR=1/BUS=' + search + '/maximus.aspx?s=' + search, {
      waitUntil: 'domcontentloaded',
      timeout: 100000
    })
  } catch (e) {
    console.log('maximus ❌')
    return []
  }
  const content = await page.$$('.product')
  const items = []
  for (let i = 0; i < content.length; i++) {
    const value = (await content[i].innerText()).split('\n')
    const href = (await content[i].innerHTML()).split('href="')[1].split('"')[0]

    if (value[0].toLowerCase().includes(search.toLowerCase())) {
      items.push({
        name: value[0],
        price: value[1].slice(0, -2),
        link: href
      })
    }
  }
  await page.close()
  console.log('maximus ✔️')
  return items
}

async function compragamer (search) {
  const page = await browser.newPage({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36' })
  try {
    await page.goto('https://compragamer.com/?seccion=3&criterio=' + search, {
      waitUntil: 'networkidle',
      timeout: 100000
    })
  } catch (e) { // never give up in compragamer
    /* console.log('compragamer ❌')
    return [] */
    await page.goto('https://compragamer.com/?seccion=3&criterio=' + search, {
      waitUntil: 'networkidle',
      timeout: 100000
    })
  }
  const content = await page.$$('.contenidoPrincipal')
  const items = []
  for (let i = 0; i < content.length; i++) {
    const value = (await content[i].innerText()).split('\n')
    const href = (await content[i].innerHTML()).split('href="')[1].split('"')[0]
    if (value[0].toLowerCase().includes(search.toLowerCase())) {
      items.push({
        title: value[0],
        price: value[1],
        url: 'https://compragamer.com/producto' + href
      })
    }
  }

  await page.close()
  console.log('compragamer ✔️')
  return items
}
