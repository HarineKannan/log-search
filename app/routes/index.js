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

    async loadMoreLogs(query, page, pagesize) {
        page ;
        pagesize ;


        const searchUrl = new URL('http://localhost:8080/LogFetcher/logFetcher');
        searchUrl.searchParams.append("searchquery", query);
        searchUrl.searchParams.append("page", page);
        searchUrl.searchParams.append("resultsPerPage", pagesize);

        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            let data = null;
            try {
                data = await response.json();
            } catch(e) {
                console.log(e);
                return {
                    TotalHits: 0,
                    searchResults: []
                };
            }
            console.log("debug: response", data);
            const Result = data.searchResults;
            // const totalHits = data.TotalHits;


            return data;

        } else {
            console.error("unable to fetch search results, status: ", response.status);
            return {
                TotalHits: 0,
                searchResults: []
            };
        }
    }



    async model (params) {
        return;

        console.log('debug: generating index model');
        console.log(`debug: params.searchquery=${params.searchquery}`);
        console.log(`debug: params.page=${params.page}`);
        console.log(`debug: params.pagesize=${params.pagesize}`);

        const pageNew = params.page;
        const pagesizeNew = params.pagesize;
        const searchqueryNew = params.searchquery;

        let logs;
        if (pageNew < this.pageOld) {
            const startIndex = (pageNew-1)*pagesizeNew;
            const page =this.searchResults.slice(startIndex, startIndex+pagesizeNew);
            logs = {
                searchResults: page
            };
        } else {
            logs = await this.loadMoreLogs(searchqueryNew, pageNew, pagesizeNew);
            this.searchResults.push(...logs.searchResults);
        }

        this.pageOld = pageNew;
        return logs;
    }
}

