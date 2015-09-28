import shipStart from './ship';

Hull.ready(function(hull, me, platform, org){
  shipStart(document.getElementById('ship'), platform.deployments[0], hull);
})
