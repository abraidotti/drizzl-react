import * as baseParticleParams from '../utilities/baseParticleParams'

export function getParticleParams(forecast) {
  let params = baseParticleParams

  params.particles.number.value = Math.abs(Math.round(3 * forecast.temperature))

  

  params.particles.line_linked.color = `#${forecast.windBearing}${forecast.windBearing}`
  params.particles.line_linked.opacity = forecast.humidity
  params.particles.line_linked.width = forecast.humidity * 10

  console.log('adjusted params in getParticleParams', params)
  console.log('forecast in getParticleParams', forecast)

  return params
};
