// Generated from queryparser.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';


const serializedATN = [4,0,8,55,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,
7,4,2,5,7,5,2,6,7,6,2,7,7,7,1,0,1,0,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,3,1,3,
1,3,1,4,4,4,31,8,4,11,4,12,4,32,1,5,1,5,5,5,37,8,5,10,5,12,5,40,9,5,1,5,
1,5,1,6,4,6,45,8,6,11,6,12,6,46,1,6,1,6,1,7,4,7,52,8,7,11,7,12,7,53,0,0,
8,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,1,0,4,2,0,65,90,97,122,1,0,39,39,3,
0,9,10,13,13,32,32,1,0,48,57,58,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,
1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,1,17,1,0,0,0,
3,19,1,0,0,0,5,22,1,0,0,0,7,26,1,0,0,0,9,30,1,0,0,0,11,34,1,0,0,0,13,44,
1,0,0,0,15,51,1,0,0,0,17,18,5,61,0,0,18,2,1,0,0,0,19,20,5,33,0,0,20,21,5,
61,0,0,21,4,1,0,0,0,22,23,5,97,0,0,23,24,5,110,0,0,24,25,5,100,0,0,25,6,
1,0,0,0,26,27,5,111,0,0,27,28,5,114,0,0,28,8,1,0,0,0,29,31,7,0,0,0,30,29,
1,0,0,0,31,32,1,0,0,0,32,30,1,0,0,0,32,33,1,0,0,0,33,10,1,0,0,0,34,38,5,
39,0,0,35,37,8,1,0,0,36,35,1,0,0,0,37,40,1,0,0,0,38,36,1,0,0,0,38,39,1,0,
0,0,39,41,1,0,0,0,40,38,1,0,0,0,41,42,5,39,0,0,42,12,1,0,0,0,43,45,7,2,0,
0,44,43,1,0,0,0,45,46,1,0,0,0,46,44,1,0,0,0,46,47,1,0,0,0,47,48,1,0,0,0,
48,49,6,6,0,0,49,14,1,0,0,0,50,52,7,3,0,0,51,50,1,0,0,0,52,53,1,0,0,0,53,
51,1,0,0,0,53,54,1,0,0,0,54,16,1,0,0,0,5,0,32,38,46,53,1,6,0,0];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class queryparserLexer extends antlr4.Lexer {

    static grammarFileName = "queryparser.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'='", "'!='", "'and'", "'or'" ];
	static symbolicNames = [ null, null, null, null, null, "IDENTIFIER", "STRING", 
                          "WS", "NUMBER" ];
	static ruleNames = [ "T__0", "T__1", "T__2", "T__3", "IDENTIFIER", "STRING", 
                      "WS", "NUMBER" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.atn.PredictionContextCache());
    }
}

queryparserLexer.EOF = antlr4.Token.EOF;
queryparserLexer.T__0 = 1;
queryparserLexer.T__1 = 2;
queryparserLexer.T__2 = 3;
queryparserLexer.T__3 = 4;
queryparserLexer.IDENTIFIER = 5;
queryparserLexer.STRING = 6;
queryparserLexer.WS = 7;
queryparserLexer.NUMBER = 8;



