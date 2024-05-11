grammar queryparser;

query: condition (logicalOperator condition)*;

condition: field comparisonOperator value;

field: IDENTIFIER;

comparisonOperator: '=' | '!=';

logicalOperator: 'and' | 'or';

value: STRING ;

IDENTIFIER: [a-zA-Z]+;
STRING: '\'' ~'\''* '\'';
WS: [ \t\r\n]+ -> skip;
NUMBER: [0-9]+;