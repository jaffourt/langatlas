import pandas as pd
import json

df = pd.read_csv('REST_DB.csv')
db = []
pk = 0
for [trash, ind] in df.iterrows():
    pk += 1
    product = {
        "model": "products.product",
        "pk": pk,
        "fields": {
            'subjID': ind.subjID,
            'downloads': 0,
            'SPM_activations': ind.SPM_image,
            'FS_activations': ind.FS_image,
            'individual_stats': {
                'LH_SN_spcorr': ind.LH_SN_spcorr,
                'RH_SN_spcorr': ind.RH_SN_spcorr,
                'LH_SN_volume': ind.LH_SN_volume,
                'RH_SN_volume': ind.RH_SN_volume,
                'LH_SN_ES': ind.LH_SN_ES,
                'RH_SN_ES': ind.RH_SN_ES,
                'Lateralization_volume': ind.Lateralization_volume,
                'Lateralization_ES': ind.Lateralization_ES,
                'Lateralization': ind.Lateralization
            },
            'SPM_SN_file': {
                'SPM_file_t': ind.SPM_file_t,
                'SPM_file_c': ind.SPM_file_c
            },
            'FS_SN_file': {
                'FS_file_lh': ind.FS_file_lh,
                'FS_file_rh': ind.FS_file_rh
            }
        }
    }
    db.append(product)

json.dump(db, open('../products.json', 'w', encoding='utf-8'))
