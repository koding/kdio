import aws from './instance-types/aws'
import azure from './instance-types/azure'
import doProvider from './instance-types/do'
import vagrant from './instance-types/vagrant'
import gce from './instance-types/gce'


export default getMachineSpecs = (instanceType, provider) ->

  switch provider
    when 'aws' then aws[instanceType]
    when 'azure' then azure[instanceType]
    when 'doProvider' then doProvider[instanceType]
    when 'vagrant' then vagrant[instanceType]
    when 'gce' then gce[instanceType]
    else {}