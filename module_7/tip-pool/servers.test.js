describe("Servers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  })

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');

  })

  it('should add the correct number of servers to the server table', function () {
    allServers = { "server1": { serverName: 'Brian' }, "server2": { serverName: 'Sharon' } }
    updateServerTable()
    expect(Object.keys(allServers).length).toEqual(serverTbody.childNodes.length)
  })

  afterEach(function () {
    allServers = {};
    serverTbody.innerHTML = '';
    serverNameInput.value = '';
  })
});
