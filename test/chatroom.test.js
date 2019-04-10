const ChatRoom = require('../lib/chatroom');

describe('chat room test', () => 
{
    let chatRoom = null;
    let user1 = {};
    let user2 = {};
    let clientObject = null;
    let clientObject2 = null;

    beforeEach(() => 
    {
        chatRoom = new ChatRoom;
        clientObject = chatRoom.add(user1);
        clientObject2 = chatRoom.add(user2);
    });

    it('chat room instance adds a client', () => 
    {
        expect(clientObject.username).toEqual(expect.any(String));
    });

    it('get client object by username', () => 
    {
        const userObj = chatRoom.getClient(clientObject.username);
        expect(userObj).toEqual(clientObject);
    });

    it('on chatRoom.rename, return new username', () => 
    {
        const newUserName = 'banana';
        const nameFromMap = chatRoom.renameClient(clientObject.username, newUserName);
        const notAUser = chatRoom.renameClient('dingdong', newUserName);
        expect(nameFromMap).toEqual(newUserName);
        expect(notAUser).toBeFalsy();
    });

    it('if new user name exists, do nothing!', () => 
    {
        const AlreadyAUser = chatRoom.renameClient(clientObject2.username, 'user1');
        expect(AlreadyAUser).toBeTruthy();
    });
    it('check that calling .all() on the chat rooms returns array of all clients', ()=>{
        
        const expected = 
        [
            { 'username': 'user1' }, { 'username': 'user2' }
        ];
        const allClients = chatRoom.call();
       
        expect(expected).toEqual(allClients);
    });
});
