from scipy import stats

def test0():
    print(f'norm cdf 0 {stats.norm.cdf(0)}')
    print(f'norm cdf 0.999 {stats.norm.cdf(0.999)}')

