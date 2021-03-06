/*
 * Copyright 2017-2018 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { Dimension } from "../../../common/models/dimension/dimension";
import { ContinuousDimensionKind, getGranularities, Granularity, granularityToString, isGranularityValid } from "../../../common/models/granularity/granularity";
import { Unary } from "../../../common/utils/functional/functional";
import { formatGranularity } from "../../../common/utils/time/time";
import { STRINGS } from "../../config/constants";
import { InputWithPresets, Preset } from "../input-with-presets/input-with-presets";

export interface GranularityPickerProps {
  dimension: Dimension;
  granularity: string;
  granularityChange: Unary<string, void>;
}

export const GranularityPicker: React.SFC<GranularityPickerProps> = ({ dimension, granularity, granularityChange }) => {
  if (!dimension.isContinuous()) return null;

  const granularities = dimension.granularities || getGranularities(dimension.kind as ContinuousDimensionKind, dimension.bucketedBy);
  const presets: Preset[] = granularities.map((g: Granularity) => {
    const granularityStr = granularityToString(g);
    return {
      name: formatGranularity(granularityStr),
      identity: granularityStr
    };
  });

  return <InputWithPresets
    title={STRINGS.granularity}
    selected={granularity}
    errorMessage={!isGranularityValid(dimension.kind, granularity) && "Invalid granularity format"}
    onChange={granularityChange}
    placeholder="Custom granularity"
    presets={presets}/>;
};
