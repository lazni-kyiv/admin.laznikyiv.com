export function parseLazniChan(metaRaw) {
    let lazni = 0
    let chan = 0
  
    let meta = {}
    try { meta = JSON.parse(metaRaw || '{}') } catch(e){}
  
    if (meta?.l?.l) {
      const p = meta.l.l.split(':')
      lazni = Number(p[1]) || 0
    }
  
    if (meta?.l?.c) {
      const p = meta.l.c.split(':')
      chan = Number(p[1]) || 0
    }
  
    return { lazni, chan }
  }
  