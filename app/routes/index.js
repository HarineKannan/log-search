import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
    queryParams = {
        logtype: {
          refreshModel: false
        },
        searchquery: {
          refreshModel: true
        },
        page: {
          refreshModel: true
        },
        pagesize: {
          refreshModel: true
        },
    };

    pageBuffer = new Map();
    totalHits = 0;

    async addPageToBuffer (searchQuery, pageNo, pageSize) {
        if (this.pageBuffer.get(pageNo)) return;

        const searchUrl = new URL('http://localhost:4200/LogFetcher/logFetch');
        searchUrl.searchParams.append("searchquery", searchQuery);
        searchUrl.searchParams.append("page", pageNo);
        searchUrl.searchParams.append("resultsPerPage", pageSize);

        const response = await fetch(searchUrl, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            this.pageBuffer.set(pageNo, jsonResponse.searchResults);
            this.totalHits = jsonResponse.TotalHits;
            return;
        } else {
            throw response;
        }
    }

    async model(params, transition) {
        const newQueryParam = transition.to.queryParams;

        if (!transition.from) {
            const searchQuery = newQueryParam.searchquery ? newQueryParam.searchquery : "";
            const page = newQueryParam.page ? newQueryParam.page : "1";
            const pageSize = newQueryParam.pagesize ? newQueryParam.pagesize : "10";

            try {
                await this.addPageToBuffer(searchQuery, page, pageSize);
            } catch (err) {
                console.log(`unable to get logs page for searchQuery=${searchQuery}, page=${page}, pageSize=${pageSize}`, err);
                return { searchResults: [], TotalHits: 0 };
            }
            return { searchResults: this.pageBuffer.get(page), TotalHits: this.totalHits };
        }

        const oldQueryParam = transition.from.queryParams;

        let searchQueryChanged = newQueryParam.searchquery !== oldQueryParam.searchquery;
        let pageSizeChanged = newQueryParam.pagesize !== oldQueryParam.pagesize;

        if (searchQueryChanged || pageSizeChanged) {
            this.pageBuffer.clear();
        }

        const searchQuery = newQueryParam.searchquery ? newQueryParam.searchquery : "";
        const page = newQueryParam.page ? newQueryParam.page : "1";
        const pageSize = newQueryParam.pagesize ? newQueryParam.pagesize : "10";

        try {
            await this.addPageToBuffer(searchQuery, page, pageSize);
        } catch (err) {
            console.error(`unable to get logs page for searchQuery=${searchQuery}, page=${page}, pageSize=${pageSize}`, err);
            return { searchResults: [], TotalHits: 0 };
        }

        return { searchResults: this.pageBuffer.get(page), TotalHits: this.totalHits };
    }
}
