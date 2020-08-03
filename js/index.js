//(function (d3,topojson) {
  'use strict';

  const svg = d3.select('svg');

  const projection = d3.geoNaturalEarth1();
  const pathGen = d3.geoPath().projection(projection);

  svg.append('path')
      .attr('class', 'sphere');
    //  .attr('d', pathGen({type: 'Sphere'}));


  Promise.all([
    d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
    d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')

  ]).then(([tsvData, topodata]) => {
  //  console.log(tsvData);


  const countryName = tsvData.reduce((accumulator,d) => {
    accumulator [d.iso_n3] = d.name;
    return accumulator;
  },{});

  const continent = tsvData.reduce((accumulator,d) => {
    accumulator [d.iso_n3] = d.continent;
    return accumulator;
  },{});

  const subregion = tsvData.reduce((accumulator,d) => {
    accumulator [d.iso_n3] = d.subregion;
    return accumulator;
  },{});
  /*
  tsvData.forEach(d => {
    countryName[d.iso_n3] = d.name;


  });
*/
    const countries = topojson.feature(topodata, topodata.objects.countries);
    svg.selectAll('path').data(countries.features)
      .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGen)

        .append('title')

        .text(d => continent[d.id]+'=>'+subregion[d.id]+'=>'+countryName[d.id])



  //   .text(d => countryName[d.id])



     ;
  });
//  d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv')
//    .then(data =>);
//  d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
//    .then(data => {

    //      .append('title')
        //    .text(d => d.)
//    });

//}(d3,topojson));
