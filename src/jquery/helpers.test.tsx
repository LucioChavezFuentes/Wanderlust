import dayjs from 'dayjs';
import {getNecessaryForecast} from './helpers';

describe('getNecessaryForecast function', () => {

    const todayForecast = {dt: dayjs().unix(), }

    it('get expected result with correct data', () => {
        const days = Array.from({length: 5}).map((day, index) => {
            return {dt: dayjs().add(index, 'day').unix(), dt_txt: dayjs().add(index, 'day').toISOString() } 
          })
        
        const daysWithoutFirst = days.filter((day, index) => {
            if(index === 0) {
                return false
            } else {
                return true
            }
        })
        
    
        const expectedResult = [todayForecast, ...daysWithoutFirst]
        
        expect(getNecessaryForecast(days, todayForecast )).toStrictEqual(expectedResult)
    })

    it('return error if list of forecast fetch fails', () => {
        const expectedResult = {
            error: 'List of Forecast has not been provided'
          }
        expect(getNecessaryForecast(undefined, todayForecast )).toStrictEqual(undefined)
    })
   
})