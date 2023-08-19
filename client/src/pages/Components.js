import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Get screen size
export const ScreenSize = () => {
  const theme = useTheme();
  const isXLarge = useMediaQuery(theme.breakpoints.only('xl'));
  const isLarge = useMediaQuery(theme.breakpoints.only('lg'));
  const isMedium = useMediaQuery(theme.breakpoints.only('md'));
  const isSmall = useMediaQuery(theme.breakpoints.only('sm'));
  const isXSmall = useMediaQuery(theme.breakpoints.only('xs'));

  if (isXLarge) {
    return 4;
  } else if (isLarge) {
    return 3;
  } else if (isMedium) {
    return 2;
  } else if (isSmall) {
    return 1;
  } else if (isXSmall) {
    return 0;
  }
}

// Parse custom tile regex and return tile image object
// "1p"   ->  1pin
// "234s" ->  2sou, 3sou, 4sou
// "E"    ->  east wind
// "R"    ->  red dragon
// "T-"   ->  white dragon (tofu) turned 90 degrees
// "S="   ->  south winds turned & double stacked
// "X"    ->  hidden tile
// "?"    ->  unknown tile
// "  "   ->  empty space
export const Tiles = (tileIDs, size=2) => {
  let tiles = [];
  let orientation = 0;
  let suit = "";
  let dimensions = ['45px', '60px', '36px', '90px', '22px']; // tile width, tile height, face width, stack height, empty space width

  if (size === 0) {
    dimensions = ['27px', '36px', '22px', '54px', '13px'];
  } else if (size === 1) {
    dimensions = ['36px', '48px', '29px', '72px', '17px'];
  }

  // Parse string in reverse to determine correct tile
  for (let i = tileIDs.length - 1; i >= 0; --i) {
    if (/[0-9]/.test(tileIDs[i])) {
      tiles.push(MakeNumberTile(tileIDs[i], suit, orientation, dimensions));
      orientation = 0;
    } else if (/[mps]/.test(tileIDs[i])) {
      suit = tileIDs[i];
    } else if (/[ESWNTGR?]/.test(tileIDs[i]))  {
      tiles.push(MakeHonorTile(tileIDs[i], orientation, dimensions));
      orientation = 0;
    } else if (/[ _]/.test(tileIDs[i]))  {
      tiles.push(MakeSpace(dimensions));
    } else if (/X/.test(tileIDs[i])) {
      tiles.push(MakeHiddenTile(dimensions));
    } else if (/[-]/.test(tileIDs[i]))  {
      orientation = 1;
    } else if (/[=]/.test(tileIDs[i]))  {
      orientation = 2;
    } else {
      tiles.push(MakeHonorTile('?', orientation, dimensions));
      orientation = 0;
    }
  }

  // Return tile object
  return (
    <Stack direction="row" spacing={'1px'} alignItems="flex-end">
      {tiles.reverse()}
    </Stack>
  )
};

// Make tiles
const MakeNumberTile = (value, suit, orientation, dimensions) => {
  if (orientation === 0) {
    return (
      <Box sx={{width: dimensions[0], height: dimensions[1], position: 'relative'}}>
        <Box component="img" src={TileLookup.front.src} alt={TileLookup.front.alt} sx={{ width: dimensions[0], position: 'relative'}}/>
        <Box component="img" src={TileLookup[suit][value].src} alt={TileLookup[suit][value].alt} sx={{ width: dimensions[2], position: 'absolute', top: '10%', left: '10%'}}/>
      </Box>
    )
  }
  if (orientation === 1) {
    return (
      <Box sx={{width: dimensions[1], height: dimensions[1], position: 'relative', transform: 'rotate(-90deg)'}}>
        <Box component="img" src={TileLookup.front.src} alt={TileLookup.front.alt} sx={{width: dimensions[0], position: 'relative'}}/>
        <Box component="img" src={TileLookup[suit][value].src} alt={TileLookup[suit][value].alt} sx={{ width: dimensions[2], position: 'absolute', top: '10%', left: '7.5%'}}/>
      </Box>
    )
  }
  return (
    <Box sx={{width: dimensions[2], height: dimensions[3], position: 'relative'}}>
      <Stack direction="row" spacing={0.1} sx={{position: 'relative', top: '33.4%', transform: 'rotate(-90deg)'}}>
        <Box sx={{width: dimensions[0], height: dimensions[1], position: 'relative'}}>
          <Box component="img" src={TileLookup.front.src} alt={TileLookup.front.alt} sx={{width: dimensions[0], position: 'relative'}}/>
          <Box component="img" src={TileLookup[suit][value].src} alt={TileLookup[suit][value].alt} sx={{width: dimensions[2], position: 'absolute', top: '10%', left: '10%'}}/>
        </Box>
        <Box sx={{width: dimensions[0], height: dimensions[1], position: 'relative'}}>
          <Box component="img" src={TileLookup.front.src} alt={TileLookup.front.alt} sx={{width: dimensions[0], position: 'relative'}}/>
          <Box component="img" src={TileLookup[suit][value].src} alt={TileLookup[suit][value].alt} sx={{width: dimensions[2], position: 'absolute', top: '10%', left: '10%'}}/>
        </Box>
      </Stack>
    </Box>
  )
}
const MakeHonorTile = (value, orientation, dimensions) => {
  if (orientation === 0) {
    return (
      <Box sx={{width: dimensions[0], height: dimensions[1], position: 'relative'}}>
        <Box component="img" src={TileLookup.front.src} alt={TileLookup.front.alt} sx={{ width: dimensions[0], position: 'relative'}}/>
        <Box component="img" src={TileLookup[value].src} alt={TileLookup[value].alt} sx={{ width: dimensions[2], position: 'absolute', top: '10%', left: '10%'}}/>
      </Box>
    )
  }
  if (orientation === 1) {
    return (
      <Box sx={{width: dimensions[1], height: dimensions[1], position: 'relative', transform: 'rotate(-90deg)'}}>
        <Box component="img" src={TileLookup.front.src} alt={TileLookup.front.alt} sx={{width: dimensions[0], position: 'relative'}}/>
        <Box component="img" src={TileLookup[value].src} alt={TileLookup[value].alt} sx={{ width: dimensions[2], position: 'absolute', top: '10%', left: '7.5%'}}/>
      </Box>
    )

  }
  return (
    <Box sx={{width: dimensions[1], height: dimensions[3], position: 'relative'}}>
      <Stack direction="row" spacing={0.1} sx={{position: 'relative', top: '33.4%', transform: 'rotate(-90deg)'}}>
        <Box sx={{width: dimensions[0], height: dimensions[1], position: 'relative'}}>
          <Box component="img" src={TileLookup.front.src} alt={TileLookup.front.alt} sx={{width: dimensions[0], position: 'relative'}}/>
          <Box component="img" src={TileLookup[value].src} alt={TileLookup[value].alt} sx={{width: dimensions[2], position: 'absolute', top: '10%', left: '10%'}}/>
        </Box>
        <Box sx={{width: dimensions[0], height: dimensions[1], position: 'relative'}}>
          <Box component="img" src={TileLookup.front.src} alt={TileLookup.front.alt} sx={{width: dimensions[0], position: 'relative'}}/>
          <Box component="img" src={TileLookup[value].src} alt={TileLookup[value].alt} sx={{width: dimensions[2], position: 'absolute', top: '10%', left: '10%'}}/>
        </Box>
      </Stack>
    </Box>
  )
}
const MakeSpace = (dimensions) => {
  return (
    <Box sx={{width: dimensions[4], height: dimensions[1], position: 'relative'}} />
  )
}
const MakeHiddenTile = (dimensions) => {
  return (
    <Box sx={{width: dimensions[0], height: dimensions[1], position: 'relative'}}>
      <Box component="img" src={TileLookup.back.src} alt={TileLookup.back.alt} sx={{ width: dimensions[0], position: 'relative'}}/>
    </Box>
  )
}

// Object to lookup image file path
const TileLookup = {
  'front': {
    src: "/tiles/png/regular/front.png",
    alt: "Tile front"
  },
  'back': {
    src: "/tiles/png/regular/back.png",
    alt: "Tile back"
  },
  '?': {
    src: "/tiles/png/regular/blank.png",
    alt: "? tile"
  },
  'E': {
    src: "/tiles/svg/regular/ton.svg",
    alt: "East"
  },
  'S': {
    src: "/tiles/svg/regular/nan.svg",
    alt: "South"
  },
  'W': {
    src: "/tiles/svg/regular/shaa.svg",
    alt: "West"
  },
  'N': {
    src: "/tiles/svg/regular/pei.svg",
    alt: "North"
  },
  'T': {
    src: "/tiles/svg/regular/haku.svg",
    alt: "Haku"
  },
  'G': {
    src: "/tiles/svg/regular/hatsu.svg",
    alt: "Hatsu"
  },
  'R': {
    src: "/tiles/svg/regular/chun.svg",
    alt: "Chun"
  },
  m: {
    '1': {
      src: "/tiles/svg/regular/man1.svg",
      alt: "1 Man"
    },
    '2': {
      src: "/tiles/svg/regular/man2.svg",
      alt: "2 Man"
    },
    '3': {
      src: "/tiles/svg/regular/man3.svg",
      alt: "3 Man"
    },
    '4': {
      src: "/tiles/svg/regular/man4.svg",
      alt: "4 Man"
    },
    '5': {
      src: "/tiles/svg/regular/man5.svg",
      alt: "5 Man"
    },
    '6': {
      src: "/tiles/svg/regular/man6.svg",
      alt: "6 Man"
    },
    '7': {
      src: "/tiles/svg/regular/man7.svg",
      alt: "7 Man"
    },
    '8': {
      src: "/tiles/svg/regular/man8.svg",
      alt: "8 Man"
    },
    '9': {
      src: "/tiles/svg/regular/man9.svg",
      alt: "9 Man"
    },
    '0': {
      src: "/tiles/svg/regular/man5-dora.svg",
      alt: "Red 5 Man"
    },
  },
  p: {
    "1": {
      src: "/tiles/svg/regular/pin1.svg",
      alt: "1 Pin"
    },
    '2': {
      src: "/tiles/svg/regular/pin2.svg",
      alt: "2 Pin"
    },
    '3': {
      src: "/tiles/svg/regular/pin3.svg",
      alt: "3 Pin"
    },
    '4': {
      src: "/tiles/svg/regular/pin4.svg",
      alt: "4 Pin"
    },
    '5': {
      src: "/tiles/svg/regular/pin5.svg",
      alt: "5 Pin"
    },
    '6': {
      src: "/tiles/svg/regular/pin6.svg",
      alt: "6 Pin"
    },
    '7': {
      src: "/tiles/svg/regular/pin7.svg",
      alt: "7 Pin"
    },
    '8': {
      src: "/tiles/svg/regular/pin8.svg",
      alt: "8 Pin"
    },
    '9': {
      src: "/tiles/svg/regular/pin9.svg",
      alt: "9 Pin"
    },
    '0': {
      src: "/tiles/svg/regular/pin5-dora.svg",
      alt: "Red 5 Pin"
    },
  },
  's': {
    '1': {
      src: "/tiles/svg/regular/sou1.svg",
      alt: "1 Sou"
    },
    '2': {
      src: "/tiles/svg/regular/sou2.svg",
      alt: "2 Sou"
    },
    '3': {
      src: "/tiles/svg/regular/sou3.svg",
      alt: "3 Sou"
    },
    '4': {
      src: "/tiles/svg/regular/sou4.svg",
      alt: "4 Sou"
    },
    '5': {
      src: "/tiles/svg/regular/sou5.svg",
      alt: "5 Sou"
    },
    '6': {
      src: "/tiles/svg/regular/sou6.svg",
      alt: "6 Sou"
    },
    '7': {
      src: "/tiles/svg/regular/sou7.svg",
      alt: "7 Sou"
    },
    '8': {
      src: "/tiles/svg/regular/sou8.svg",
      alt: "8 Sou"
    },
    '9': {
      src: "/tiles/svg/regular/sou9.svg",
      alt: "9 Sou"
    },
    '0': {
      src: "/tiles/svg/regular/sou5-dora.svg",
      alt: "Red 5 Sou"
    },
  },
}