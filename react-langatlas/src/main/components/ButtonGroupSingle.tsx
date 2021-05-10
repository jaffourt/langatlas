import React from 'react';
import publicIp from "public-ip";

const ButtonGroupSingle = (props: any) => {
    const {p} = props;
    const download = async (id: number, title: string) => {
        if(window.confirm(`Download subject ${title} data?`)) {
            await fetch(`http://localhost:8000/api/products/${id}`)
                .then(response=> response.json())
                .then((data) => {
                    data['downloads']++;
                    fetch(`http://localhost:8000/api/products/${id}`, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            subjID: data['subjID'],
                            FS_SN_file: data['FS_SN_file'],
                            FS_activations: data['FS_activations'],
                            SPM_SN_file: data['SPM_SN_file'],
                            SPM_activations: data['SPM_activations'],
                            individual_stats:  data['individual_stats'],
                            behavioral: data['behavioral'],
                            downloads: data['downloads']++
                        })
                    })
                })
                .catch(e => console.error(e))

            const userIPv4 = await publicIp.v4({
                fallbackUrls: [ "https://ifconfig.co/ip" ]
            });
            const userIPv6 = await publicIp.v6({
                fallbackUrls: [ "https://ifconfig.co/ip" ]
            });

            await fetch(`http://localhost:8000/api/users`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ipv4: userIPv4,
                    ipv6: userIPv6
                })
            }).catch(e=> console.error(e))
        }
    }

    return (

        <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
                <div className="btn btn-sm btn-outline-secondary" onClick={()=>download(p.id, p.title)}>Download</div>
            </div>
        </div>
    );
};

export default ButtonGroupSingle;