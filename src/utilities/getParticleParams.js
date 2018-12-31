import * as baseParticleParams from '../utilities/baseParticleParams'

export function getParticleParams(forecast) {
  let params = baseParticleParams

  // number of particles
  params.particles.number.value = Math.abs(Math.round(3 * forecast.temperature))

  // color
  params.particles.color.value = `#${(forecast.humidity * 1000).toString().split("").join("e") + "e"}`
  params.particles.shape.stroke.color = `#BF${Math.floor(forecast.dewPoint * 100)}`

  // size
  params.particles.size.value = forecast.temperature

  // movement
  let directions = ["none", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"]
  params.particles.move.direction = directions[Math.floor(Math.random() * 9)]

  // line links
  params.particles.line_linked.opacity = forecast.humidity
  params.particles.line_linked.width = forecast.humidity * 10
  params.particles.line_linked.distance = forecast.temperature * 2

  console.log('adjusted params in getParticleParams', params)
  console.log('forecast in getParticleParams', forecast)

  return params
};
