import { string, number, object, boolean, TypeOf } from 'zod';



const createPayload = {
    body: object({
        ipAddress: string().array().optional(),
        ipCountry: string().array().optional(),
        cardIssuer: string().array().optional(),
        cardFingerprint: object({
            cardNumber: string({
                required_error: "cardNumber is required"
            }),
            fingerPrint: string({
                required_error: "fingerPrint is required"
            }),
        }).array().optional(),
        cardCountry : string().array().optional(),
        cardBin : string().array().optional(),
        matadata: object({
            key: string({
                required_error: "key is required"
            }),
            value: string({
                required_error: "value is required"
            })
        }).array().optional(),
        email: string().array().optional(),
        userAgent: string().array().optional(),
        acceptLanguage: string().array().optional()
    })
}

const updatePayload = {
    body: object({
        ipAddress: string().array().optional(),
        ipCountry: string().array().optional(),
        cardIssuer: string().array().optional(),
        cardFingerprint: object({
            cardNumber: string({
                required_error: "cardNumber is required"
            }),
            fingerPrint: string({
                required_error: "fingerPrint is required"
            }),
        }).array().optional(),
        cardCountry : string().array().optional(),
        cardBin : string().array().optional(),
        matadata: object({
            key: string({
                required_error: "key is required"
            }),
            value: string({
                required_error: "value is required"
            })
        }).array().optional(),
        email: string().array().optional(),
        userAgent: string().array().optional(),
        acceptLanguage: string().array().optional()
    })
};

const params = {
    params: object({
        blacklistCode : string({
           required_error: "blacklistCode is required"
        })
    })
 };
  

  
export const createBlacklistSchema = object({
  ...createPayload,
});


export const updateBlacklistSchema = object({
  ...updatePayload,
  ...params
});


export const getBlacklistSchema = object({
    ...params
});


export const deleteBlacklistSchema = object({
    ...params
});


export type CreateBlacklistInput = TypeOf<typeof createBlacklistSchema>;
export type updateBlacklistInput = TypeOf<typeof updateBlacklistSchema>;
export type getBlacklistInput = TypeOf<typeof getBlacklistSchema>;
export type deleteBlacklistInput = TypeOf<typeof deleteBlacklistSchema>;


