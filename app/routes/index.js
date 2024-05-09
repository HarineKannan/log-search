import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class IndexRoute extends Route {
    @service router;

    queryParams = {
        logtype: {
          refreshModel: false
        },
        searchquery: {
          refreshModel: false
        },
        page: {
          refreshModel: false
        },
        pagesize: {
          refreshModel: false
        },
    };

    pageOld = 1;
    lastPage =  Math.ceil(this.totalHits / this.pagesize);
    currentPage = 1;
    searchResults = [];

    setupController (controller, model, transition) {
        let page = parseInt(transition.to.queryParams.page);
        let pageSize = parseInt(transition.to.queryParams.pagesize);
        let searchQuery = transition.to.queryParams.searchquery;

        page = page ? page : 1;
        pageSize = pageSize ? pageSize : 10;
        searchQuery = searchQuery ? searchQuery : "";

        controller.send('searchLogs', searchQuery);
        controller.send('goToPage', 0, pageSize);
    }
   
}

