export const getImageUrl = (path) => {
    return new URL(`/assets/${path}`, import.meta.url).href;
};


export const unslugify = (link) =>{
    let path = link.slice(1);
    let pathname = (path[0].toUpperCase() + path.slice(1)).replace("-",' ')
    return pathname
}