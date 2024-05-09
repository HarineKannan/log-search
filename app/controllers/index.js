import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import queryparserLexer from './antlr/queryparserLexer.js';
import queryparserParser from './antlr/queryparserParser.js';
import * as antlr4 from 'antlr4';
import { ErrorListener } from 'antlr4';



export default class IndexController extends Controller {
  queryParams = [{
    logtype: {
      type: 'string'
    },
    searchquery: {
        type: 'string'
    },
    page: {
      type: 'number'
    },
    pagesize: {
      type: 'number'
    }
  }];
  @tracked logtype = null;
  @tracked searchquery = '';
  @tracked page = 1;
  @tracked pagesize = 10;

  @tracked logsBuffer = [];
  @tracked logsCurrentPage = [];
  @service router;
  @tracked isTableView = true;
  @tracked isListView = false;
  @tracked searchQuery = "task = '2'";
  @tracked resultsPerPage = 10;
  isLoading = false;
  isSuccess = false;
  @tracked totalHits =0;
  // @tracked pageset = Math.ceil(this.totalHits / this.resultsPerPage);
  @tracked showSuggestions = true;
  @tracked syntaxError = false;
  @tracked syntaxErrorMessage = '';
  @tracked Suggestion = [];
  @tracked syntaxErrorMsg = '';
  @tracked selectedSuggestionIndex = 0;
  @tracked applicationLastTime = this.getTime;
  @tracked systemLastTime = this.getTime;
  @tracked fieldname = '';
  @tracked ProviderNameMenuClicked = false;
  @tracked LevelMenuClicked = false;
  @tracked TaskMenuClicked = false;
  @tracked TypeofValues;
  @tracked gotValues = false;
  @tracked tableData = [];


  get pageset(){
    return Math.ceil(this.totalHits / this.pagesize);
  }

  

  @action
  async generatePDF() {
    await this.fetchData(
      'http://localhost:8080/LogFetcher/generatePDF',
      {
        searchKeyword: this.searchQuery,
      },
    );
  }


  @action
  handleMouseLeave() {
    this.showSuggestions = false;
    this.syntaxErrorMessage = '';
  }

  @action
  handleInput(event) {
    this.searchQuery = event.target.value;
    this.selectedSuggestion = null;
    const inputQuery = this.searchQuery;
    console.log(inputQuery);

    const chars = new antlr4.InputStream(inputQuery);
    const lexer = new queryparserLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new queryparserParser(tokens);

    const errorListener = new CustomErrorListener();
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);
    const lastWord = inputQuery.split(' ').pop().trim();
    parser.query();

    if (errorListener.syntaxErrorsCount > 0) {
      this.syntaxError = true;
      this.syntaxErrorMsg = errorListener.Suggestion;
      let startsWithWords = this.syntaxErrorMsg.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(lastWord.toLowerCase()),
      );
      let containsWords = this.syntaxErrorMsg.filter((suggestion) =>
        suggestion.toLowerCase().includes(lastWord.toLowerCase()),
      );

      let combinedSuggestions = new Set(startsWithWords.concat(containsWords));
      this.syntaxErrorMessage = [...combinedSuggestions];
      console.log('No');
    } else {
      const lastChar = inputQuery.charAt(inputQuery.length - 1);
      if (lastChar === ' ') {
        console.log(this.showSuggestions);
        this.syntaxError = true;
        this.Suggestion = ['and', 'or'];
        this.syntaxErrorMessage = this.Suggestion;
        console.log('Yes');
      }
    }

    this.selectedSuggestionIndex = -1;
    console.log('selectedSuggestionIndex:', this.selectedSuggestionIndex);
    const inputElement = document.getElementById('searchQuery');
  }

  @action
  handleData(selectedValue) {
    console.log('Received data:', selectedValue);
    this.TypeofValues = selectedValue;
    this.getTypeOfValues();
  }

  @action
  logKeyAndValue(key, value) {
    console.log('Key:', key);
    console.log('Value:', value);
    if (this.searchQuery != '') {
      this.searchQuery += ' and ';
    }
    this.searchQuery += `${key} = '${value}'`;
  }


  @tracked isit = false;
  @tracked dropdownShownFor = {};

  toggleDropDown(key) {
    this.isit = true;
    console.log('Toggling dropdown for key:', key);
    if (this.dropdownShownFor[key]) {
        this.dropdownShownFor[key] = true;
    }
    console.log('Updated dropdownShownFor:', this.dropdownShownFor);
}


  @action
  async getTypeOfValues() {
      if (this.TypeofValues != '') {
          const payload = this.generateTypeofValuePayload();
          await this.GetAggregatedResults('http://localhost:8080/LogFetcher/topLeastValues', payload);
          this.gotValues = true;
          console.log(this.tableData);
      }
  }


  async GetAggregatedResults(url, payload) {
    try {
      const queryString = new URLSearchParams(payload).toString();
      const response = await fetch(`${url}?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.tableData = data.results;

        console.log(this.tableData);
        console.log('Operation successful');
      } else {
        throw new Error('Operation failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  @action
  generateTypeofValuePayload() {
    return {
      fieldName: this.fieldname,
      typeOfValue: this.TypeofValues,
    };

  }


  @action
  handleMenuClick(menuPropertyName) {
    this[menuPropertyName] = !this[menuPropertyName];

    if (menuPropertyName === 'ProviderNameMenuClicked') {
      this.LevelMenuClicked = false;
      this.TaskMenuClicked = false;
      this.fieldname = 'provider_name';
    } else if (menuPropertyName === 'LevelMenuClicked') {
      this.fieldname = 'level';
      this.ProviderNameMenuClicked = false;
      this.TaskMenuClicked = false;
    } else if (menuPropertyName === 'TaskMenuClicked') {
      this.fieldname ='task';
      this.ProviderNameMenuClicked = false;
      this.LevelMenuClicked = false;
    }

    setTimeout(() => {
      if (this[menuPropertyName]) {
        document.body.addEventListener('click', this.closeMenuOutside);
      } else {
        document.body.removeEventListener('click', this.closeMenuOutside);
      }
    }, 100);
  }

  @action
  closeMenuOutside(event) {
    console.log('Closing menu outside');
    const menu = document.getElementById('TypeofValues');
    const isClickedInsideMenu = menu.contains(event.target);
    if (!isClickedInsideMenu) {
      this.ProviderNameMenuClicked = false;
      this.LevelMenuClicked = false;
      this.TaskMenuClicked = false;

      document.body.removeEventListener('click', this.closeMenuOutside);
      this.gotValues = false;
    }
  }
  @action
  handleDropdownChange(value) {
    console.log('Selected value:', value);
    this.getTypeOfValues(value);
  }

  @action
  switchToTableView() {
    this.isTableView = true;
    this.isListView = false;
    console.log('Switching to table view');
  }

  @action
  switchToListView() {
    this.isTableView = false;
    this.isListView = true;
    console.log('Switching to list view');
  }

  @action
  handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectPreviousSuggestion();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectNextSuggestion();
    } else if (event.key === 'Enter' && this.selectedSuggestionIndex !== 0) {
      this.selectSuggestion(
        this.syntaxErrorMessage[this.selectedSuggestionIndex],
      );
    } else if (event.key === 'Tab') {
      event.preventDefault();
      if (this.selectedSuggestionIndex == -1) {
        this.selectSuggestion(this.syntaxErrorMessage[0]);
      }
    }
  }

  selectPreviousSuggestion() {
    if (this.selectedSuggestionIndex >= 0) {
      if (this.selectedSuggestionIndex === 0) {
        this.selectedSuggestionIndex = this.syntaxErrorMessage.length - 1;
      } else {
        this.selectedSuggestionIndex--;
      }
      this.updateSearchQueryWithSelectedSuggestion();
    } else {
      this.selectedSuggestionIndex = this.syntaxErrorMessage.length - 1;
      this.updateSearchQueryWithSelectedSuggestion();
    }
  }

  selectNextSuggestion() {
    if (this.selectedSuggestionIndex < this.syntaxErrorMessage.length - 1) {
      if (this.selectedSuggestionIndex === this.syntaxErrorMessage.length - 1) {
        this.selectedSuggestionIndex = 0;
      } else {
        this.selectedSuggestionIndex++;
      }
      this.updateSearchQueryWithSelectedSuggestion();
    } else {
      this.selectedSuggestionIndex = 0;
      this.updateSearchQueryWithSelectedSuggestion();
    }
  }

  updateSearchQueryWithSelectedSuggestion() {
    if (
      this.selectedSuggestionIndex !== -1 &&
      this.syntaxErrorMessage[this.selectedSuggestionIndex]
    ) {
      console.log(this.selectedSuggestionIndex);
      const selectedSuggestion =
        this.syntaxErrorMessage[this.selectedSuggestionIndex];
      const words = this.searchQuery.split(' ');
      words[words.length - 1] = selectedSuggestion;
      this.searchQuery = words.join(' ');
    }
  }

  @action
  selectSuggestion(suggestion) {
    if (this.searchQuery.endsWith(' ')) {
      this.searchQuery += suggestion;
    } else {
      const words = this.searchQuery.split(' ');
      words[words.length - 1] = suggestion;
      this.searchQuery = words.join(' ');
    }

    const inputElement = document.getElementById('searchQuery');

  }

  // fetches logs till endIndex, endIndex not included
  async fetchLogsTill(searchquery, endIndex) {

    const searchUrl = new URL('http://localhost:8080/LogFetcher/logFetch');
    searchUrl.searchParams.append("searchquery", searchquery);

    searchUrl.searchParams.append("page", 1);
    searchUrl.searchParams.append("resultsPerPage",
      endIndex - this.logsBuffer.length);

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      let responseJson = null;
      responseJson = await response.json();
      console.log("debug: fetchLogsTill() response,", responseJson);
      console.log(this.logsBuffer);
      this.totalHits = responseJson.TotalHits;
      this.logsBuffer.push(...responseJson.searchResults);
    } else {
      throw response;
    }
  }

  logsExist(startIndex, endIndex) {
    if (startIndex > endIndex) return false;

    const startIndexInRange = startIndex >= 0
      && startIndex < (this.totalHits-1);
    const endIndexInRange = endIndex > 0 && endIndex < this.totalHits;

    return startIndexInRange && endIndexInRange;
  }

  logsExistInBuffer (startIndex, endIndex) {
    return this.logsBuffer.length >= endIndex;
  }

  @action
  async goToPage(page, startIndex, endIndex) {
    console.log("in go to page");
    if (!this.logsExist(startIndex, endIndex)) {
      // console.log("goToPage() failed index not in range");
      return;
    }

    if (!this.logsExistInBuffer(startIndex, endIndex)) {
      await this.fetchLogsTill(this.searchquery, endIndex)
    }

    this.logsCurrentPage = this.logsBuffer.slice(startIndex, endIndex);
    console.log(this.logsBuffer);
    this.router.transitionTo({
      queryParams: { page: page }
    });
  }

  @action
  async nextPage() {
    const startIndex = this.page * this.pagesize;
    const endIndex = startIndex + this.pagesize;

    await this.goToPage(this.page+1, startIndex, endIndex);
  }


  @action
  async previousPage() {
    if (this.page <= 1) {
      console.log("can't go before 1");
    }

    const startIndex = (this.page-2) * this.pagesize;
    const endIndex = startIndex + this.pagesize;
    console.log(startIndex,endIndex);


    await this.goToPage(this.page-1, startIndex, endIndex);
  }

  async fetchData(url, body) {
    try {
      this.set('isLoading', true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        this.set('isLoading', false);
        this.set('isSuccess', true);

        setTimeout(() => {
          this.set('isSuccess', false);
        }, 2000);

        console.log('Operation successful');
      } else {
        throw new Error('Operation failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }


  @action
  updatePageSize(size) {
    if (this.resultsPerPage == size) {
      return;
    }
    this.resultsPerPage = size;
    this.router.transitionTo({
      queryParams: {
        pagesize: size,
      },
    });
    this.goToPage(1, 0, this.pagesize);
  }

  @action
  async syncLogs() {
    await this.fetchData(
      'http://localhost:8080/LogFetcher/logFetch',
      {
        logtype: this.logtype,
      },
    );
  }

  @action
  updateLogType(logType) {
    this.router.transitionTo({
      queryParams: {
        logtype: logType,
      },
    });
  }

  @action
  async SyncTime(url, payload) {
    try {
      const searchUrl = new URL(url);
      const jsonPayload = JSON.stringify(payload);
      const response = await fetch(searchUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonPayload,
      });
      if (response.ok) {
        const data = await response.json();
        this.applicationLastTime = data.applicationSyncTime;
        this.systemLastTime = data.SystemSyncTime;
        console.log('Updated applicationLastTime:', this.applicationLastTime);
        console.log('Updated System time:', this.systemLastTime);
      } else {
        console.error('Failed to fetch data from the backend');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  @action
  async getTime() {
    const payload = {};
    await this.SyncTime('http://localhost:8080/LogFetcher/logFetch', payload);
  }

  @action
  async searchLogs(searchQuery) {
    console.log(searchQuery);
    this.logsBuffer = [];
    
    try {
       await this.fetchLogsTill(searchQuery, this.pagesize);
    } catch (err) {
      console.error("searchLogs failed", err);
      return;
    }
    this.logsCurrentPage = this.logsBuffer;
    this.router.transitionTo({
      queryParams: {
        searchquery: searchQuery
      }
    });
  }
}

class CustomErrorListener extends ErrorListener {
  constructor() {
    super();
    this.syntaxErrorsCount = 0;
    this.errorMessage = '';
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    this.syntaxErrorsCount++;
    const expectedTokens = msg.match(/{(.*?)}/);
    if (expectedTokens) {
      this.errorMessage = expectedTokens[1];
      this.Suggestion = this.errorMessage
        .split(',')
        .map((token) => token.replace(/'/g, '').trim());
    } else {
      this.errorMessage = '';
      this.Suggestion = [];
    }
  }
}
