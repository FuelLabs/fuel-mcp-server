[Docs](https://docs.fuel.network/) /

Nightly  /

[Sway Standards](https://docs.fuel.network/docs/nightly/sway-standards/) /

Src 9 Metadata Keys

## _Icon Link_ [SRC-9: Native Asset](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#src-9-native-asset)

The following standard attempts to define the keys of relevant on-chain metadata for any [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets). Any contract that implements the SRC-9 standard MUST implement the [SRC-7](https://docs.fuel.network/docs/nightly/sway-standards/src-7-asset-metadata/) and [SRC-20](https://docs.fuel.network/docs/nightly/sway-standards/src-20-native-asset/) standards. This is a living standard where revisions may be made as the ecosystem evolves.

## _Icon Link_ [Motivation](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#motivation)

The SRC-9 standard seeks to enable relevant data for assets on the Fuel Network. This data may include images, text, contact, or all of the above. All metadata queries are done through a single function to facilitate cross-contract calls.

## _Icon Link_ [Prior Art](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#prior-art)

The use of generic metadata for [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets) is defined in the [SRC-7](https://docs.fuel.network/docs/nightly/sway-standards/src-7-asset-metadata/) standard. This standard integrates into the existing [SRC-7](https://docs.fuel.network/docs/nightly/sway-standards/src-7-asset-metadata/) standard.

## _Icon Link_ [Specification](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#specification)

The following keys are reserved for the SRC-9 standard. Use of the keys should follow the SRC-9 specification.

All keys SHALL use snake case.

The social prefix SHALL be used for any social media platform and SHALL return usernames.

Any social media metadata keys SHALL follow the following syntax `social:site` where:

- The `social` keyword must be prepended to denote this is a social platform
- The `site` keyword must be the website or platform of the social

## _Icon Link_ [`social:discord`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialdiscord)

The key `social:discord` SHALL return a `String` variant of a username for the Discord platform.

## _Icon Link_ [`social:facebook`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialfacebook)

The key `social:facebook` SHALL return a `String` variant of a username for the Facebook platform.

## _Icon Link_ [`social:farcaster`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialfarcaster)

The key `social:farcaster` SHALL return a `String` variant of a username for the Farcaster platform.

## _Icon Link_ [`social:friend.tech`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialfriendtech)

The key `social:friend.tech` SHALL return a `String` variant of a username for the Friend.tech platform.

## _Icon Link_ [`social:github`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialgithub)

The key `social:github` SHALL return a `String` variant of a username for the Github platform.

## _Icon Link_ [`social:instagram`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialinstagram)

The key `social:instagram` SHALL return a `String` variant of a username for the Instagram platform.

## _Icon Link_ [`social:lens`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#sociallens)

The key `social:lens` SHALL return a `String` variant of a username for the Lens Protocol.

## _Icon Link_ [`social:linkedin`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#sociallinkedin)

The key `social:linkedin` SHALL return a `String` variant of a username for the LinkedIn platform.

## _Icon Link_ [`social:reddit`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialreddit)

The key `social:reddit` SHALL return a `String` variant of a username for the Reddit platform.

## _Icon Link_ [`social:signal`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialsignal)

The key `social:signal` SHALL return a `String` variant of a username for the Signal platform.

## _Icon Link_ [`social:telegram`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialtelegram)

The key `social:telegram` SHALL return a `String` variant of a username for the Telegram platform.

## _Icon Link_ [`social:tiktok`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialtiktok)

The key `social:tiktok` SHALL return a `String` variant of a username for the TikTok platform.

## _Icon Link_ [`social:x`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialx)

The key `social:x` SHALL return a `String` variant of a username for the X or formerly Twitter platform.

## _Icon Link_ [`social:wechat`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialwechat)

The key `social:wechat` SHALL return a `String` variant of a username for the WeChat platform.

## _Icon Link_ [`social:whatsapp`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialwhatsapp)

The key `social:whatsapp` SHALL return a `String` variant of a username for the WhatsApp platform.

## _Icon Link_ [`social:youtube`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#socialyoutube)

The key `social:youtube` SHALL return a `String` variant of a username for the YouTube platform.

## _Icon Link_ [Contact](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#contact)

The `contact` prefix SHALL be used for any contact information on a particular project's team for an asset.

Any contact information metadata keys SHALL follow the following syntax `contract:type` where:

- The `contact` keyword must be prepended to denote this is contact information
- The `type` keyword must be the method of contact

The key SHALL use snake case.

## _Icon Link_ [`contact:email`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#contactemail)

The key `contact:email` SHALL return a `String` variant of an email.

## _Icon Link_ [`contact:mailing`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#contactmailing)

The key `contact:mailing` SHALL return a `String` variant of a mailing address. All mailing addresses MUST follow the UPU addressing format.

## _Icon Link_ [`contact:phone`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#contactphone)

The key `contact:phone` SHALL return a `String` variant of a phone number. All phone numbers SHALL follow the E.164 standard.

## _Icon Link_ [`contact:company`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#contactcompany)

The key `contact:company` SHALL return a `String` variant of a company name.

## _Icon Link_ [External Links](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#external-links)

The `link` prefix SHALL be used for any external webpage hyperlink associated with an asset.

Any external webpage metadata keys SHALL follow the following syntax `link:site` where:

- The `link` keyword must be prepended to denote this is an external webpage
- The `site` keyword must be an external website

## _Icon Link_ [`link:home`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#linkhome)

The key `link:home` SHALL return a `String` variant of the asset's project homepage.

## _Icon Link_ [`link:contact`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#linkcontact)

The key `link:contact` SHALL return a `String` variant of the asset's project contact information webpage.

## _Icon Link_ [`link:docs`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#linkdocs)

The key `link:docs` SHALL return a `String` variant of the asset's project documentation webpage.

## _Icon Link_ [`link:forum`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#linkforum)

The key `link:forum` SHALL return a `String` variant of the asset's project forum webpage.

## _Icon Link_ [`link:blog`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#linkblog)

The key `link:blog` SHALL return a `String` variant of the asset's project blog.

## _Icon Link_ [`link:linktree`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#linklinktree)

The key `link:linktree` SHALL return a `String` variant of the asset's project linktree information webpage.

## _Icon Link_ [Resources](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#resources)

The `res` prefix SHALL be used for any resources or general information on an asset.

Any resource metadata keys SHALL follow the following syntax `rec:type` where:

- The `res` keyword must be prepended to denote this is a resource
- The `type` keyword must be the type of resource

## _Icon Link_ [`res:license`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#reslicense)

The key `res:license` SHALL return a `String` variant of the asset's project license.

## _Icon Link_ [`res:tos`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#restos)

The key `res:tos` SHALL return a `String` variant of the asset's project Terms of Service.

## _Icon Link_ [`res:author`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#resauthor)

The key `res:author` SHALL return a `String` variant of the asset's project author. This MAY be a full name or pseudonym.

## _Icon Link_ [`res:about`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#resabout)

The key `res:about` SHALL return a `String` variant about the asset's project up to 2048 characters.

## _Icon Link_ [`res:description`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#resdescription)

The key `res:description` SHALL return a `String` variant describing the asset's project up to 256 characters.

## _Icon Link_ [`res:date`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#resdate)

The key `res:date` SHALL return a `Int` variant of a UNIX timestamp.

## _Icon Link_ [`res:block`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#resblock)

The key `res:block` SHALL return a `Int` variant of a block number.

## _Icon Link_ [Images](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#images)

The `image` prefix SHALL be used for any image files associated with a singular asset.

Any image metadata keys SHALL follow the following syntax `image:type` where:

- The `image` keyword must be prepended to denote this is an image
- The `type` keyword must be the file type of the image

## _Icon Link_ [`image:svg`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#imagesvg)

The key `image:svg` SHALL return a `String` variant of an SVG image.

## _Icon Link_ [`image:png`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#imagepng)

The key `image:png` SHALL return a `String` variant of a URI for a PNG image.

## _Icon Link_ [`image:jpeg`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#imagejpeg)

The key `image:jpeg` SHALL return a `String` variant of a URI for a JPEG image.

## _Icon Link_ [`image:webp`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#imagewebp)

The key `image:webp` SHALL return a `String` variant of a URI for a WebP image.

## _Icon Link_ [`image:gif`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#imagegif)

The key `image:gif` SHALL return a `String` variant of a URI for a GIF image.

## _Icon Link_ [`image:heif`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#imageheif)

The key `image:heif` SHALL return a `String` variant of a URI for a HEIF image.

## _Icon Link_ [Video](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#video)

The `video` prefix SHALL be used for any video files associated with a singular asset.

Any video metadata keys SHALL follow the following syntax `video:type` where:

- The `video` keyword must be prepended to denote this is a video
- The `type` keyword must be the file type of the video

## _Icon Link_ [`video:mp4`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#videomp4)

The key `video:mp4` SHALL return a `String` variant of a URI for an MP4 video.

## _Icon Link_ [`video:webm`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#videowebm)

The key `video:webm` SHALL return a `String` variant of a URI for a WebM video.

## _Icon Link_ [`video:m4v`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#videom4v)

The key `video:m4v` SHALL return a `String` variant of a URI for a M4V video.

## _Icon Link_ [`video:ogv`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#videoogv)

The key `video:ogv` SHALL return a `String` variant of a URI for an OGV video.

## _Icon Link_ [`video:ogg`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#videoogg)

The key `video:ogg` SHALL return a `String` variant of a URI for an OGG video.

## _Icon Link_ [Audio](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#audio)

The `audio` prefix SHALL be used for any audio files associated with a singular asset.

Any audio metadata keys SHALL follow the following syntax `audio:type` where:

- The `audio` keyword must be prepended to denote this is audio metadata
- The `type` keyword must be the file type of the audio

## _Icon Link_ [`audio:mp3`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#audiomp3)

The key `audio:mp3` SHALL return a `String` variant of a URI for an MP3 file.

## _Icon Link_ [`audio:wav`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#audiowav)

The key `audio:wav` SHALL return a `String` variant of a URI for a WAV file.

## _Icon Link_ [`audio:oga`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#audiooga)

The key `audio:oga` SHALL return a `String` variant of a URI for an OGA file.

## _Icon Link_ [Media](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#media)

The `media` prefix SHALL be used for any media associated with a particular singular asset.

Any media metadata keys SHALL follow the following syntax `media:type` where:

- The `media` keyword must be prepended to denote this is a video
- The `type` keyword must be the file type of the media

## _Icon Link_ [`media:gltf`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#mediagltf)

The key `media:gltf` SHALL return a `String` variant of a URI for a glTF file.

## _Icon Link_ [`media:glb`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#mediaglb)

The key `media:glb` SHALL return a `String` variant of a URI for a GLB file.

## _Icon Link_ [Logos](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logos)

The `logo` prefix SHALL be used for any images associated with a particular asset or project.

Any logo metadata keys SHALL follow the following syntax `logo:type` where:

- The `logo` keyword must be prepended to denote this is a logo
- The `type` keyword must be the type of logo

## _Icon Link_ [`logo:svg`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logosvg)

The key `logo:svg` SHALL return a `String` variant of an SVG image of a logo.

## _Icon Link_ [`logo:svg_light`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logosvg_light)

The key `logo:svg_light` SHALL return a `String` variant of an SVG image of a logo for light themes.

## _Icon Link_ [`logo:svg_dark`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logosvg_dark)

The key `logo:svg_dark` SHALL return a `String` variant of an SVG image of a logo for dark themes.

## _Icon Link_ [`logo:small_light`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logosmall_light)

The key `logo:small_light` SHALL return a `String` variant of a URI for a 32x32 PNG image of a logo for light themes.

## _Icon Link_ [`logo:small_dark`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logosmall_dark)

The key `logo:small_dark` SHALL return a `String` variant of a URI for a 32x32 PNG image of a logo for dark themes.

## _Icon Link_ [`logo:medium_light`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logomedium_light)

The key `logo:medium_light` SHALL return a `String` variant of a URI for a 256x256 PNG image of a logo for light themes.

## _Icon Link_ [`logo:medium_dark`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logomedium_dark)

The key `logo:medium_dark` SHALL return a `String` variant of a URI for a 256x256 PNG image of a logo for dark themes.

## _Icon Link_ [`logo:large_light`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logolarge_light)

The key `logo:large_light` SHALL return a `String` variant of a URI for a 1024x1024 PNG image of a logo for light themes.

## _Icon Link_ [`logo:large_dark`](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#logolarge_dark)

The key `logo:large_dark` SHALL return a `String` variant of a URI for a 1024x1024 PNG image of a logo for dark themes.

## _Icon Link_ [Attributes](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#attributes)

The `attr` prefix SHALL be used for any attributes associated with a singular asset.

Any attribute metadata keys SHALL follow the following syntax `attr:type` where:

- The `attr` keyword must be prepended to denote this is an attribute
- The `type` keyword must be the type of attribute

There are no standardized types of attributes.
Example: `attr:eyes`.

## _Icon Link_ [Rationale](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#rationale)

The SRC-9 standard should allow for standardized keys for metadata on the Fuel Network. This standard builds off existing standards and should allow other contracts to query any relevant information on the asset.

## _Icon Link_ [Backwards Compatibility](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#backwards-compatibility)

This standard is compatible with Fuel's [Native Assets _Icon Link_](https://docs.fuel.network/docs/sway/blockchain-development/native_assets), the [SRC-20](https://docs.fuel.network/docs/nightly/sway-standards/src-20-native-asset/) standard, and the [SRC-7](https://docs.fuel.network/docs/nightly/sway-standards/src-7-asset-metadata/) standard.

## _Icon Link_ [Security Considerations](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#security-considerations)

This standard does not call external contracts, nor does it define any mutations of the contract state.

## _Icon Link_ [Example](https://docs.fuel.network/docs/nightly/sway-standards/src-9-metadata-keys/\#example)

```fuel_Box fuel_Box-idXKMmm-css
impl SRC7 for Contract {
    fn metadata(asset: AssetId, key: String) -> Option<Metadata> {
        if (asset != AssetId::default()) {
            return Option::None;
        }

        match key {
            String::from_ascii_str("social:x") => {
                let social = String::from_ascii_str("fuel_network");
                Option::Some(Metadata::String(social))
            },
            _ => Option::None,
        }
    }
}
```

_Icon ClipboardText_