import trae from 'trae'
import configService from './config'

const rappiProductService = trae.create({
  baseUrl: configService.apiUrl
})

export default rappiProductService
