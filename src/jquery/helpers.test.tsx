import dayjs from 'dayjs';
import {getNecessaryForecast} from './helpers';

test('getNecessaryForecast function', () => {

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

    const listForecast = [{dt: new Date().getDate(), dt_txt: '' }]
    const todayForecast = {dt: dayjs().unix(), }

    const expectedResult = [todayForecast, ...daysWithoutFirst]
    
    expect(getNecessaryForecast(days, todayForecast )).toStrictEqual(expectedResult)
})