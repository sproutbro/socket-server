const path0 = [
    { x: 100, y: 500 },
    { x: 110, y: 418 },
    { x: 310, y: 426 },
    { x: 312, y: 323 },
    { x: 92, y: 321 },
    { x: 95, y: 230 },
    { x: 319, y: 223 },
    { x: 300, y: 132 },
]

const path1 = path0.slice().reverse();

export const stage1 = [
    { path: path0, money: 500, land: { x: 0, y: 510, width: 360, height: 130 } },
    { path: path1, money: 500, land: { x: 0, y: 0, width: 360, height: 138 } },
];