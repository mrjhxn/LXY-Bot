module.exports.config = {
  name: 'resend',
  version: '2.2.2',
  hasPermssion: 1,
  credits: 'Chard Fix',
  description: 'Thats the response',
  commandCategory: 'group',
  usages: '',
  cooldowns: 5,
  dependencies: {
    tinyurl: '',
    'fs-extra': '',
    request: '',
    axios: '',
    path: '',
  },
}
module.exports.handleEvent = async function ({
  event: _0x1948f7,
  api: _0x51bd39,
  Users: _0xc7896a,
}) {
  if (_0x51bd39.getCurrentUserID() == _0x1948f7.senderID) {
    return
  }
  let {
    messageID: _0x1e4893,
    senderID: _0xa27470,
    threadID: _0x562182,
    body: _0x4cf065,
  } = _0x1948f7
  const _0x29ec4c = global.nodemodule['fs-extra'],
    _0x5d9be0 = global.nodemodule.axios,
    _0x56c69c = global.nodemodule.request,
    { resolve: _0x2babaa } = global.nodemodule.path
  if (!global.moduleData.message) {
    global.moduleData.message = new Array()
  }
  !_0x29ec4c.existsSync(__dirname + '/cache/resend.json') &&
    _0x29ec4c.writeFileSync(
      __dirname + '/cache/resend.json',
      JSON.stringify({}),
      null,
      8
    )
  var _0x4347f0 = JSON.parse(
    _0x29ec4c.readFileSync(__dirname + '/cache/resend.json')
  )
  !Object.keys(_0x4347f0).some(
    (_0x35f6ba) => _0x35f6ba == _0x1948f7.threadID.toString()
  ) &&
    _0x1948f7.isGroup &&
      ((_0x4347f0[_0x1948f7.threadID] = { on: 'true' }),
      _0x29ec4c.writeFileSync(
        __dirname + '/cache/resend.json',
        JSON.stringify(_0x4347f0, null, 8)
      ))
  _0x4347f0 = JSON.parse(
    _0x29ec4c.readFileSync(__dirname + '/cache/resend.json')
  )
  if (!_0x4347f0) {
    return
  }
  if (_0x4347f0[_0x1948f7.threadID.toString()]) {
    let _0x43f407 = _0x4347f0[_0x1948f7.threadID.toString()].on
    if (_0x43f407 == 'false') {
      return
    }
  }
  if (_0x1948f7.type != 'message_unsend') {
    global.moduleData.message.push({
      msgID: _0x1e4893,
      msgBody: _0x4cf065,
      attachment: _0x1948f7.attachments,
    })
  }
  if (_0x1948f7.type == 'message_unsend') {
    if (
      !global.moduleData.message.some(
        (_0x46164e) => _0x46164e.msgID == _0x1e4893
      )
    ) {
      return
    }
    var _0x33b656 = global.moduleData.message.find(
      (_0xc43580) => _0xc43580.msgID == _0x1e4893
    )
    let _0x3daac6 = (await _0x51bd39.getUserInfo(_0x1948f7.senderID))[
      _0x1948f7.senderID
    ].name
    if (_0x33b656.msgBody != '') {
      return _0x51bd39.sendMessage(
        {
          body:
            _0x3daac6 +
            ' just remove a message:\n\n❖━━━━━━━━━━━━❖\n► 𝗖𝗢𝗡𝗧𝗘𝗡𝗧 : ' +
            _0x33b656.msgBody + '\n❖━━━━━━━━━━━━❖\n\nBleee baka fasthand to!!! HAHAHAHA',
          mentions: [
            {
              tag: _0x3daac6,
              id: _0xa27470,
            },
          ],
        },
        _0x562182
      )
    } else {
      let _0x4c2361 = 0,
        _0x1405b5 = [],
        _0x1037fb =
          _0x3daac6 +
          ' just remove an ' +
          _0x33b656.attachment.length +
          ' attachment:\n\n'
      for (
        var _0x51a3f3 = 0;
        _0x51a3f3 < _0x33b656.attachment.length;
        _0x51a3f3++
      ) {
        _0x4c2361 += 1
        console.log(_0x33b656.attachment[_0x51a3f3].type)
        var _0x479907 = _0x56c69c.get(_0x33b656.attachment[_0x51a3f3].url),
          _0xab5364 = _0x479907.uri.pathname,
          _0x5363c6 = _0xab5364.slice(_0xab5364.lastIndexOf('.')),
          _0x48841c = (
            await _0x5d9be0.get(_0x33b656.attachment[_0x51a3f3].url, {
              responseType: 'arraybuffer',
            })
          ).data
        if (_0x33b656.attachment[_0x51a3f3].type == 'audio') {
          pathus = __dirname + ('/cache/unsend' + _0x51a3f3 + '.m4a')
        } else {
          if (_0x33b656.attachment[_0x51a3f3].type == 'video') {
            pathus = __dirname + ('/cache/unsend' + _0x51a3f3 + '.mp4')
          } else {
            pathus = __dirname + ('/cache/unsend' + _0x51a3f3 + _0x5363c6)
          }
        }
        _0x29ec4c.writeFileSync(pathus, Buffer.from(_0x48841c, 'utf-8'))
        _0x1405b5.push(_0x29ec4c.createReadStream(pathus))
      }
      _0x51bd39.sendMessage(
        {
          body: _0x1037fb,
          attachment: _0x1405b5,
          mentions: [
            {
              tag: _0x3daac6,
              id: _0xa27470,
            },
          ],
        },
        _0x562182
      )
    }
  }
}
module.exports.run = async function ({ api: _0x1ac51e, event: _0x4d3577 }) {
  let { messageID: _0x438f8e, threadID: _0x3a2303 } = _0x4d3577,
    _0x4dfff5 = global.nodemodule['fs-extra'],
    _0x32104e = JSON.parse(
      _0x4dfff5.readFileSync(__dirname + '/cache/resend.json')
    )
  if (!_0x32104e[_0x3a2303.toString()]) {
    return (
      (_0x32104e[_0x3a2303.toString()] = { on: 'true' }),
      _0x4dfff5.writeFileSync(
        __dirname + '/cache/resend.json',
        JSON.stringify(_0x32104e, null, 8)
      ),
      _0x1ac51e.sendMessage('Create data response successfully', _0x3a2303, _0x438f8e)
    )
  }
  let _0x2f3b51 = _0x32104e[_0x3a2303.toString()]
  switch (_0x2f3b51.on) {
    case 'false':
      ;(_0x2f3b51.on = 'true'),
        _0x1ac51e.sendMessage(
          'Turn on resend successfully!',
          _0x3a2303,
          () =>
            _0x4dfff5.writeFileSync(
              __dirname + '/cache/resend.json',
              JSON.stringify(_0x32104e, null, 4)
            ),
          _0x438f8e
        )
      break
    case 'true':
      ;(_0x2f3b51.on = 'false'),
        _0x1ac51e.sendMessage(
          'Turn off resend successfully!',
          _0x3a2303,
          () =>
            _0x4dfff5.writeFileSync(
              __dirname + '/cache/resend.json',
              JSON.stringify(_0x32104e, null, 4)
            ),
          _0x438f8e
        )
      break
  }
}
