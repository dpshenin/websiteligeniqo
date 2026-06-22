const fs = require('fs');
const { execFileSync } = require('child_process');

const groups = {
  shared: [
    'https://ligeniqo.com/wp-content/uploads/2024/05/logoSVG.svg',
    'https://ligeniqo.com/wp-content/uploads/2024/05/logoFootSvg.svg',
    'https://ligeniqo.com/wp-content/uploads/2024/05/footerbg1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/podpis.png',
    'https://ligeniqo.com/wp-content/uploads/2024/07/renc1.svg',
    'https://ligeniqo.com/wp-content/uploads/2024/07/renc2.svg',
    'https://ligeniqo.com/wp-content/uploads/2024/07/renc3.svg',
    'https://ligeniqo.com/wp-content/uploads/2024/07/renc4.svg',
    'https://ligeniqo.com/wp-content/uploads/2024/07/recn5.svg',
    'https://ligeniqo.com/wp-content/uploads/2024/07/recn6.svg',
    'https://ligeniqo.com/wp-content/uploads/2024/07/rup4.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/img1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/img2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/img3.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/img4.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/img5.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/who1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/who2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/who3.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/who4.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/who5.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/who6.png',
    'https://ligeniqo.com/wp-content/uploads/2024/05/meetimg.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/Rectangle-7180.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/cardimg1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/cardbg1.png'
  ],
  'lead-generation': [
    'https://ligeniqo.com/wp-content/uploads/2024/06/num1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/num2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/num3.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG3.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG4.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG5.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG6.1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG6.2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG6.3.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG6.4.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG7.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG8.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG9.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadIMG10.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadPilotImg.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadWHY1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadWHY2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadR1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/leadR2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/laedR5.png'
  ],
  'demand-generation': [
    'https://ligeniqo.com/wp-content/uploads/2024/06/demg2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmimg1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmimg2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmimg3.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmimg4.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/butBG.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/timeLine.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/team.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/whatbgUP.png'
  ],
  'consultancy-and-training': [
    'https://ligeniqo.com/wp-content/uploads/2024/06/ct1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/ct2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/ct3.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/ct4.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/ct5.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/ct6.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/ct7.png'
  ],
  'marketing-automation': [
    'https://ligeniqo.com/wp-content/uploads/2024/06/mat1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/mat2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/mat3.png'
  ],
  'brand-developing': [
    'https://ligeniqo.com/wp-content/uploads/2024/06/gt1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmimg1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmimg2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmimg3.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmimg4.png'
  ],
  'influencer-marketing-services': [
    'https://ligeniqo.com/wp-content/uploads/2024/06/infl1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/infl2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/winsImg1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/winsImg2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/winsImg3.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmFAQimg1.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmFAQimg2.png',
    'https://ligeniqo.com/wp-content/uploads/2024/06/smmFAQimg3.png'
  ]
};

for (const [group, urls] of Object.entries(groups)) {
  const dir = `assets/ligeniqo-live/${group}`;
  fs.mkdirSync(dir, { recursive: true });
  for (const url of urls) {
    const name = url.split('/').pop();
    const dest = `${dir}/${name}`;
    try {
      execFileSync('curl', ['-L', '-s', url, '-o', dest], { stdio: 'ignore' });
    } catch (error) {
      console.error(`failed: ${url}`);
    }
  }
}

console.log('mirrored ligeniqo assets');
