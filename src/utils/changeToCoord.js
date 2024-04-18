// 暂时废弃
export function changeToCoord(markers, path) {
    console.log(path)
    let coords = [];
    path.map((id, index) => {
        markers.map((m, index) => {
            if (id === m.id) {
                coords = [...coords, {
                    latitude: m.latitude,
                    longitude: m.longitude
                }]
            }
        })
    })
    console.log(coords)
    return coords
}