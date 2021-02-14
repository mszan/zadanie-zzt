import './css/main.scss';
import {route} from './router.js';
import home from './components/home.html';
import example1 from './components/example1.html';
import example2 from './components/example2.html';
import e404 from './components/404.html';

route('/', 'home', home, function() {
    this.where = 'here';
});

route('/ex1', 'example1', example1, function() {
    this.title = 'Example 1';
});

route('/ex2', 'example2', example2, function() {
    this.title = 'Example 2';
    this.counter = 0;
    this.$on('.my-button', 'click', () => {
        this.counter += 1;
        this.$refresh();
    });
});

route('*', '404', e404, function () {});
