const convert = (code, status, message="", data="") => {
  return {statusCode: code, headers: {'Access-Control-Allow-Origin': '*'}, body: JSON.stringify({status, message, data})};
}

module.exports = convert;