import * as baseParticleParams from '../utilities/baseParticleParams'

export function getParticleParams(forecast) {
  let params = baseParticleParams

  // number of particles
  params.particles.number.value = Math.abs(Math.round(3 * forecast.temperature))

  // color
  params.particles.color.value = `#${(forecast.humidity * 1000).toString().split("").join("e") + "e"}`
  params.particles.shape.stroke.color = `#${Math.round(forecast.windBearing)}${Math.round(forecast.windBearing)}`
  console.log(params.particles.color.value)
  console.log(params.particles.shape.stroke.color)

  // size
  params.particles.size.value = forecast.temperature

  // movement

  // line links
  params.particles.line_linked.color = `#${forecast.windBearing}${forecast.windBearing}`
  params.particles.line_linked.opacity = forecast.humidity
  params.particles.line_linked.width = forecast.humidity * 10

  console.log('adjusted params in getParticleParams', params)
  console.log('forecast in getParticleParams', forecast)

  return params
};
