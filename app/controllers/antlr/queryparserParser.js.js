// Generated from queryparser.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import queryparserListener from './queryparserListener.js';
const serializedATN = [4,1,8,34,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,
2,5,7,5,1,0,1,0,1,0,1,0,5,0,17,8,0,10,0,12,0,20,9,0,1,1,1,1,1,1,1,1,1,2,
1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,5,0,0,6,0,2,4,6,8,10,0,2,1,0,1,2,1,0,3,4,28,
0,12,1,0,0,0,2,21,1,0,0,0,4,25,1,0,0,0,6,27,1,0,0,0,8,29,1,0,0,0,10,31,1,
0,0,0,12,18,3,2,1,0,13,14,3,8,4,0,14,15,3,2,1,0,15,17,1,0,0,0,16,13,1,0,
0,0,17,20,1,0,0,0,18,16,1,0,0,0,18,19,1,0,0,0,19,1,1,0,0,0,20,18,1,0,0,0,
21,22,3,4,2,0,22,23,3,6,3,0,23,24,3,10,5,0,24,3,1,0,0,0,25,26,5,5,0,0,26,
5,1,0,0,0,27,28,7,0,0,0,28,7,1,0,0,0,29,30,7,1,0,0,30,9,1,0,0,0,31,32,5,
6,0,0,32,11,1,0,0,0,1,18];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class queryparserParser extends antlr4.Parser {

    static grammarFileName = "queryparser.g4";
    static literalNames = [ null, "'='", "'!='", "'and'", "'or'" ];
    static symbolicNames = [ null, null, null, null, null, "IDENTIFIER", 
                             "STRING", "WS", "NUMBER" ];
    static ruleNames = [ "query", "condition", "field", "comparisonOperator", 
                         "logicalOperator", "value" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = queryparserParser.ruleNames;
        this.literalNames = queryparserParser.literalNames;
        this.symbolicNames = queryparserParser.symbolicNames;
    }



	query() {
	    let localctx = new QueryContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, queryparserParser.RULE_query);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 12;
	        this.condition();
	        this.state = 18;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===3 || _la===4) {
	            this.state = 13;
	            this.logicalOperator();
	            this.state = 14;
	            this.condition();
	            this.state = 20;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	condition() {
	    let localctx = new ConditionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, queryparserParser.RULE_condition);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 21;
	        this.field();
	        this.state = 22;
	        this.comparisonOperator();
	        this.state = 23;
	        this.value();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	field() {
	    let localctx = new FieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, queryparserParser.RULE_field);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 25;
	        this.match(queryparserParser.IDENTIFIER);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	comparisonOperator() {
	    let localctx = new ComparisonOperatorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, queryparserParser.RULE_comparisonOperator);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 27;
	        _la = this._input.LA(1);
	        if(!(_la===1 || _la===2)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	logicalOperator() {
	    let localctx = new LogicalOperatorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, queryparserParser.RULE_logicalOperator);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 29;
	        _la = this._input.LA(1);
	        if(!(_la===3 || _la===4)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	value() {
	    let localctx = new ValueContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, queryparserParser.RULE_value);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 31;
	        this.match(queryparserParser.STRING);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

queryparserParser.EOF = antlr4.Token.EOF;
queryparserParser.T__0 = 1;
queryparserParser.T__1 = 2;
queryparserParser.T__2 = 3;
queryparserParser.T__3 = 4;
queryparserParser.IDENTIFIER = 5;
queryparserParser.STRING = 6;
queryparserParser.WS = 7;
queryparserParser.NUMBER = 8;

queryparserParser.RULE_query = 0;
queryparserParser.RULE_condition = 1;
queryparserParser.RULE_field = 2;
queryparserParser.RULE_comparisonOperator = 3;
queryparserParser.RULE_logicalOperator = 4;
queryparserParser.RULE_value = 5;

class QueryContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = queryparserParser.RULE_query;
    }

	condition = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ConditionContext);
	    } else {
	        return this.getTypedRuleContext(ConditionContext,i);
	    }
	};

	logicalOperator = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(LogicalOperatorContext);
	    } else {
	        return this.getTypedRuleContext(LogicalOperatorContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.enterQuery(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.exitQuery(this);
		}
	}


}



class ConditionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = queryparserParser.RULE_condition;
    }

	field() {
	    return this.getTypedRuleContext(FieldContext,0);
	};

	comparisonOperator() {
	    return this.getTypedRuleContext(ComparisonOperatorContext,0);
	};

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.enterCondition(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.exitCondition(this);
		}
	}


}



class FieldContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = queryparserParser.RULE_field;
    }

	IDENTIFIER() {
	    return this.getToken(queryparserParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.enterField(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.exitField(this);
		}
	}


}



class ComparisonOperatorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = queryparserParser.RULE_comparisonOperator;
    }


	enterRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.enterComparisonOperator(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.exitComparisonOperator(this);
		}
	}


}



class LogicalOperatorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = queryparserParser.RULE_logicalOperator;
    }


	enterRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.enterLogicalOperator(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.exitLogicalOperator(this);
		}
	}


}



class ValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = queryparserParser.RULE_value;
    }

	STRING() {
	    return this.getToken(queryparserParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.enterValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof queryparserListener ) {
	        listener.exitValue(this);
		}
	}


}




queryparserParser.QueryContext = QueryContext; 
queryparserParser.ConditionContext = ConditionContext; 
queryparserParser.FieldContext = FieldContext; 
queryparserParser.ComparisonOperatorContext = ComparisonOperatorContext; 
queryparserParser.LogicalOperatorContext = LogicalOperatorContext; 
queryparserParser.ValueContext = ValueContext; 
