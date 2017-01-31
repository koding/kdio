import getConfig from 'utils/get-config'
import $ from 'jquery'
import getSessionToken from 'utils/get-session-token'

request = (url, body, sendCookies = yes) ->

  options =
    url: url
    type: 'POST'
    contentType: 'application/json'
    headers:
      Authorization : "Bearer " + getSessionToken()
    data: JSON.stringify body

  $.ajax options


export requestStatic = (constructorName, method, body) ->

  { kodingUrl } = getConfig()

  resourceEndpoint = "#{constructorName}.#{method}"
  url = "#{kodingUrl}/remote.api/#{resourceEndpoint}"

  request(url, body).then (res) ->
    data = if Array.isArray res.data then res.data else [res.data]
    return data.map (d) ->
      d.constructorName = constructorName
      return d


export requestInstance = (constructorName, method, id, options, query) ->

  { kodingUrl } = getConfig()

  resourceEndpoint = "#{constructorName}.#{method}"
  url = "#{kodingUrl}/remote.api/#{resourceEndpoint}/#{id}"

  request(url, options, query).then (res) ->
    data = if Array.isArray res.data then res.data else [res.data]
    return data.map (d) ->
      d.constructorName = constructorName
      return d


export ONE = 'bongo/ONE'
export SOME = 'bongo/SOME'
export UPDATE = 'bongo/UPDATE'
export MODIFY = 'bongo/MODIFY'


export staticAction = (method, actionType) -> (constructorName, body) ->
  return {
    type: actionType
    payload: requestStatic(constructorName, method, body)
  }


export instanceAction = (method, actionType) -> (instance, body) ->
  { constructorName, _id } = instance
  return {
    type: actionType
    payload: requestInstance(constructorName, method, _id, body)
  }


export one = staticAction 'one', ONE
export some = staticAction 'some', SOME
export update = instanceAction 'update', UPDATE
export modify = instanceAction 'modify', MODIFY
