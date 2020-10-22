const timeout = (second: number) => {
    return new Promise(resolve => setTimeout(resolve, second * 1000))
}

export const getAsyncColor = async () => {
    await timeout(6);

    return {
        data: {
            milky_way: '#ebebeb',
            choco_beam: '#92817a',
            sea_sand: '#f5a25d',
            copper_sulfate: '#28abb9'
        }
    }
}


export const getAsyncFont = async () => {
    await timeout(8);

    return {
        data: {

        }
    }
}