import * as baseParticleParams from '../utilities/baseParticleParams'

export function getParticleParams(forecast) {
  let params = baseParticleParams

  params.particles.number.value = Math.abs(Math.round(3 * forecast.temperature))
  
  console.log('adjusted params in getParticleParams', params)
  console.log('forecast in getParticleParams', forecast)

  return params
};
