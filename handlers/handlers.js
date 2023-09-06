// go uvezuvame modulot fetch od node-fetch

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


  // objekt za cuvanje na podatocite na keshot
const cache = {};

// funkcija za dobivanje na karakterite
const rickmorty = async (req,res) => {
  let url = `https://rickandmortyapi.com/api/location/${req.params.id}` // url na API-to


  // DODATNI INTERESNI PARAMETRI 
  {
    //     ---->    episode/33,15,26,12,5   ruta epizoda 
    
  }

// proveruvame dali imame kesh i dali mu e istecheno vremeto

if (
  cache[req.params.id] && // proveruvame dali imame kluc
  cache[req.params.id].cacheTime !== null && // proveruvame dali vremeto na keshot mu e istecheno
  cache[req.params.id].cacheTime + 60 * 1000 < new Date().getTime() // proveruvame dali vremeto na keshiranje e pomalku od tekovnoto vreme
) {
  cache[req.params.id].localCache = null; // gi brishime keshiranite podatoci ako se stari
}

  // ako nemame kluc ili ako keshot e prazen, gi zemame keshiranite podatoci

if (!cache[req.params.id] || cache[req.params.id].localCache === null) {
  let data = await fetch(url); // prevzemame podatoci od API-to
  cache[req.params.id] = {
    localCache: await data.json(), // gi zachuvuvame podatocite vo keshot kako objekt
    cacheTime: new Date().getTime(), // gi keshirame podatocite so vremenska oznaka
  };
}
return res.send(cache);   // gi prakjame keshiranite podatoci kako odgovor

};


module.exports = {rickmorty};