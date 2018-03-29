const { pool } = require('../../utils/db');

const convertParamToSql = (inParam) => {
    if (inParam instanceof Array) {
        if (inParam.length === 0) throw new Error('convertParamToSql: json array can not be empty');
        return `${inParam.map(el => convertParamToSql(el))}`
    }
    if (inParam instanceof Object)      return `E'${JSON.stringify(inParam).replace(/'/g, '\\\'')}'`;
    if (typeof(inParam) === 'number')   return isFinite(inParam) ? `${inParam}` : `NULL`;
    if (typeof(inParam) === 'string')   return `E'${inParam.replace(/'/g, '\\\'')}'`;
    if (typeof(inParam) === 'boolean')  return `${inParam}`;
    if (inParam === null)               return `${inParam}`;
    if (inParam === undefined)          return `NULL`
};

module.exports = (text, params) => {
    const sqlText = params
        ? text.replace(/\$(\d+)/g, (str, i) => convertParamToSql(params[i-1]))
        : text;

    return pool.query(sqlText)
        .then(res => { return res.rows })
        .catch(err => { throw err })
};
