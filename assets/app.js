// Expandable cards
document.querySelectorAll('.card-btn').forEach(function(btn){
  btn.addEventListener('click',function(){
    var open=btn.getAttribute('aria-expanded')==='true';
    var panel=document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded',String(!open));
    panel.hidden=open;
    btn.closest('.card').classList.toggle('open',!open);
  });
});
// Generic tabs (value layers + key numbers)
document.querySelectorAll('[role="tablist"]').forEach(function(list){
  var tabs=Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
  function select(t,focus){
    tabs.forEach(function(x){
      var on=x===t;
      x.setAttribute('aria-selected',String(on));
      x.tabIndex=on?0:-1;
      document.getElementById(x.getAttribute('aria-controls')).hidden=!on;
    });
    if(focus)t.focus();
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){select(t)});
    t.addEventListener('keydown',function(e){
      var k=e.key,n=null;
      if(k==='ArrowUp'||k==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];
      if(k==='ArrowDown'||k==='ArrowRight')n=tabs[(i+1)%tabs.length];
      if(k==='Home')n=tabs[0];if(k==='End')n=tabs[tabs.length-1];
      if(n){e.preventDefault();select(n,true)}
    });
  });
});
