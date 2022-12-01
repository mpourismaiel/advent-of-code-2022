// Run in browser console on the input page
// https://adventofcode.com/2022/day/1/input
document.querySelector('pre').innerText.split('\n\n').map(elf => elf.split('\n').reduce((tmp, weight) => tmp + parseInt(weight), 0)).reduce((max, weight) => weight > max ? weight : max, -1)
