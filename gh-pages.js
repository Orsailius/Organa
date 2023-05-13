import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://github.com/Orsailius/Organa.git', // Update to point to your repository
  user: {
   name: 'Orsailius', 
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);