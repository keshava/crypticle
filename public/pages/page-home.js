
function getPageComponent(pageOptions) {
  let {socket} = pageOptions;

  return {
    data: function () {
      return {};
    },
    methods: {},
    template: `
      <div class="page-container">
        <h2 class="content-row heading">Home</h2>
        <div class="content-body">
          Coming soon...
        </div>
      </div>
    `
  };
}

export default getPageComponent;