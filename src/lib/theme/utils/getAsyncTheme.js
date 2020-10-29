import {type defaultTheme as theme} from "../localTheme/defaultTheme.js";

const data: theme = {
    data: {
        color: {
            primary: '#39F67F',
            additional_color: {
                milky_way: '#ebebeb',
                choco_beam: '#92817a',
                sea_sand: '#f5a25d',
                copper_sulfate: '#28abb9',
            }
        }
    }
}


const timeout = (second: number) => {
    return new Promise(resolve => setTimeout(resolve, second * 1000))
}


export const getAsyncTheme = async () => {
    await timeout(5);
    console.log('Something happened')
    return data
}

