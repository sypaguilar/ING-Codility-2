import { LitElement, html, css } from 'lit';

export class ShowGrid extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      tvshowlist: {type: Array},
      complete: {type: Boolean},
      defaultsearch: {type: String}
    };
  }

  static get styles() {
    return css`
    header{
        min-height: 50px;
        display: block;
    }
    .flex-container {
        background-color: lightblue;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        min-width: 100vw;
    }

    .flex-container > .tv-show-item{
        background-color: #fff;
        border: #000 solid 1px;
        margin: 10px;
        width: 38vw;
        min-height: 130px;
        text-align: left;
    }
    .showImg {
        height: 130px;
        width: 130px;
        float: left;
        display: block;
    }
    .details {
        padding: 15px;
    }
    .showTitle {
        font-size: 30px;
        font-weight: bolder;
        display: block;
    }
    .rating {
        font-size: 20px;
        color: #777;
        display: block;
    }
    .description {
        font-size: 15px;
        color: #999;
        display: block;
        text-align: justify;
    }

    #txtSearch{
        border-radius: 20px;
    }

    @media (max-width: 800px) {
        .flex-container {
            flex-direction: column;
        }
        .flex-container > .tv-show-item{
            width: 90vw;
        }
    }
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
    this.tvshowlist = [];
    this.complete = false;
    this.defaultsearch = "girls"
  }

  async getFromAPI(){
      const search = this.defaultsearch;
    this.tvshowlist = await fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then(response => response.json())
      .then(jsonObject => {      
        jsonObject.forEach(element => {
          const elShow = element.show;
          this.tvshowlist.push({imagesrc: elShow.image, title: elShow.name, rating: elShow.rating.average, description: elShow.summary});
        });
        console.log(this.tvshowlist);
        return this.tvshowlist;
     });
     this.complete = true;
    //  working with Search button. Need to re-render showlistGrid :(
    }

    get search(){
        return this.renderRoot?.querySelector('#txtSearch') ?? null;
      }
    
    setSearch() {
        this.defaultsearch = this.search.value;
        this.search.value = '';
        this.requestUpdate();
      }
      
  render() {
    const showlist = this.tvshowlist;
    
    const showlistGrid = html`
        ${showlist.map((show)=>
            html`
            <div class="tv-show-item">
                <img alt="TV Icon" class="showImg" src="${show.imagesrc}"/>
                
                <div class="details">
                    <span class="showTitle">${show.title? show.title : "N/A"}</span>
                    <span class="rating">${show.rating ? show.rating : "N/A"}</span>
                    <span class="description">${show.description ? show.description : "N/A"}</span>
                </div>
            </div>
            `)}
      `;
            
    return html`
    <main>
        <header>
    <button @click=${this.setSearch}>Search</button>
    <input type="text" id="txtSearch" placeholder="Search TV shows"/>
        </header>

        <div class="flex-container">
            ${this.getFromAPI(this.defaultsearch)}
            ${this.complete ? showlistGrid : "No shows available"}
        </div>
        </main>
    `;
  }
}
