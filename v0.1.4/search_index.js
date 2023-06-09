var documenterSearchIndex = {"docs":
[{"location":"man/#Using-Hurst.jl","page":"Using Hurst.jl","title":"Using Hurst.jl","text":"","category":"section"},{"location":"man/","page":"Using Hurst.jl","title":"Using Hurst.jl","text":"Hurst.jl is designed to be used in two ways: directly calculating exponents for individual time series, or to systematically analyse large number of time series.","category":"page"},{"location":"man/#Individual-series","page":"Using Hurst.jl","title":"Individual series","text":"","category":"section"},{"location":"man/","page":"Using Hurst.jl","title":"Using Hurst.jl","text":"To calculate an individual series, just call hurst_exponent on your time series data along with the range of tau that you would like to calculate over: ","category":"page"},{"location":"man/","page":"Using Hurst.jl","title":"Using Hurst.jl","text":"using Hurst\nX = accumulate(+, randn(1000))\ntau_range = 1:19\nhurst_exponent(X, tau_range)","category":"page"},{"location":"man/","page":"Using Hurst.jl","title":"Using Hurst.jl","text":"This always returns the standard error of the Hurst statistic too.","category":"page"},{"location":"man/","page":"Using Hurst.jl","title":"Using Hurst.jl","text":"Given that Hurst exponents are one measure of a series' scaling properties, Generalised Hurst Exponents (GHEs) can be used to detect more complex scaling properties and infer multiscaling behaviour. For example, to calculate the Hurst exponent over a range of moments q_range:","category":"page"},{"location":"man/","page":"Using Hurst.jl","title":"Using Hurst.jl","text":"using Hurst\nq_range = 0.1:0.1:1\ntau_range = 30:250\nX = accumulate(+, randn(1000))\ngeneralised_hurst_range(X, tau_range, q_range)","category":"page"},{"location":"man/#Many-series","page":"Using Hurst.jl","title":"Many series","text":"","category":"section"},{"location":"man/","page":"Using Hurst.jl","title":"Using Hurst.jl","text":"For larger investigations, we can usefully reuse most of the memory used in the hurst analysis. For example, suppose we want to calculate the zeta(q) estimator for A and B. To calculate the exponent for A, Hurst.jl will create dependent and independet variables for a regression calculation, that are normally discarded after use...","category":"page"},{"location":"getting_started/#Getting-Started","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"Hurst.jl allows you to calculate Generalised Hurst Exponents (GHEs) in a robust and performant way.","category":"page"},{"location":"getting_started/#Install-Hurst.jl","page":"Getting Started","title":"Install Hurst.jl","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"Before anything else, install Hurst.jl in the usual way:","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"using Pkg\nPkg.add(\"Hurst\")","category":"page"},{"location":"getting_started/#Get-some-data","page":"Getting Started","title":"Get some data","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"The easiest way to demonstrate how to use Hurst.jl is with Gaussian data, so we will generate a Gaussian walk (Z(t) = sum_tau X(tau) X(tau) sim mathcalN(0 1)).","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"using Hurst, Plots, Random\nRandom.seed!(1)  \nX = cumsum(randn(3000))\nplot(X, label = \"Gaussian walk\", xlabel = \"t\", ylabel = \"X(t)\")","category":"page"},{"location":"getting_started/#Define-your-\\tau-range","page":"Getting Started","title":"Define your tau range","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"Hurst.jl calculates the Hurst exponent H by estimating the moments of the absolute increments over some time delay tau. If that sounds like gibberish, take a look at the Troubleshooting section which explains things in more detail. τ_range = 30:250 is a good place to start:","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"τ_range = 30:250","category":"page"},{"location":"getting_started/#Calculate-H","page":"Getting Started","title":"Calculate H","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"Calclating H is as simple as:","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"H, SD = hurst_exponent(X, τ_range)","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"Notice that hurst_exponent returns a 1x2 array. This is because we want to be able to calculate the Generalised Hurst Exponent (GHE) quickly as well and have a consistent API:","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"q_range = 0.1:0.1:1.\nGHE_data = generalised_hurst_range(X, τ_range, q_range)","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"plot(q_range, GHE_data[:,1], yerror = GHE_data[:, 2], xlabel = \"q\",\n    ylabel = \"H(q)\", label = nothing, ylims = (0, 1))","category":"page"},{"location":"getting_started/#Further-analysis","page":"Getting Started","title":"Further analysis","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"If you are trying to reproduce some results from papers that use the GHE, you might be interested in the quantity zeta(q) = qH(q):","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"zeta_data = Hurst.zeta_estimator_range(X, τ_range, q_range)\nplot(q_range, zeta_data[:,1], yerror = zeta_data[:, 2], xlabel = \"q\",\n    ylabel = \"ζ(q)\", label = nothing)","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"If you want to see if the data is multi-scaling, you can fit parabola to this data with Polynomials.jl:","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"using Polynomials\nquadratic_fit = fit(q_range, zeta_data[:, 1], 2)\nscatter!(q_range, zeta_data[:, 1], label = nothing)\nplot!(quadratic_fit, extrema(q_range)..., label = \"Quadratic fit\")","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"#first coefficient should be almost zero...\ncoeffs(quadratic_fit)","category":"page"},{"location":"troubleshooting/#Troubleshooting","page":"Troubleshooting","title":"Troubleshooting","text":"","category":"section"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"The most likely problem to encounter when using this package is NaN outputs from hurst_exponent(...). This normally happens when the data you have provided is not self-similar in the way the package expects. Before filing an issue on Github, please read the advice below. ","category":"page"},{"location":"troubleshooting/#TL;DR:","page":"Troubleshooting","title":"TL;DR:","text":"","category":"section"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Do the following with your data X:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Calculate τ_range = 30:250; Q = [Hurst.qth_abs_moment(X, τ, 1) for τ in τ_range]\nCheck plot(log.(τ_range), log.(Q))","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"If the plot isn't roughly linear, you have a problem and you will not get good estimates for H.","category":"page"},{"location":"troubleshooting/#Why-am-I-getting-weird-results-for-H?","page":"Troubleshooting","title":"Why am I getting weird results for H?","text":"","category":"section"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"The easiest way to demonstrate what is probably going wrong is with Gaussian data, so we will generate some Gaussian increments (X(t) sim mathcalN(0 1)) and a Gaussian walk (Z(t) = sum_tau X(tau) X(tau) sim mathcalN(0 1)).","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"using Random \nRandom.seed!(123)\nusing Plots\ngaussian_increments = randn(3000)\ngaussian_walk = cumsum(gaussian_increments)\nplot(\n    (\n        plot(gaussian_increments, label = \"Gaussian increments\"),\n        plot(gaussian_walk, label = \"Gaussian walk\")\n    )..., layout = (2, 1)\n)","category":"page"},{"location":"troubleshooting/#Verify-that-the-quantity-is-scaling","page":"Troubleshooting","title":"Verify that the quantity is scaling","text":"","category":"section"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Hurst.jl assumes your data X is self-similar, by which I mean:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"leftXleft(c t_1right) ldots Xleft(c t_kright)right stackrelmathrmd=leftc^H Xleft(t_1right) ldots c^H Xleft(t_kright)right","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"for some H  0 and a process X(t). This definition is probably only intuitive to people already familiar with the subject, so one way to visualise this as follows:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Define a time range, t_range, a scale c - let's say 0.5 - and a scaling exponent H (also 0.5).\nPlot the distribution of X[c .* t_range], i.e. generate lots of t_range and plot X[c .* t_range] each time.\nSimilarly plot the distribution of c^H .* X[t_range]\nCompare the distributions.","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"using Hurst\n\nc = 0.1\nH = 0.5\nntrials = 200\nalpha = 0.2\nstarting_t = rand(100:200)\nt_range = collect(range(starting_t, length = 20, step = 50))\nscaled_t_range = round.(Int64, c .* t_range)\nlhs_plt = plot(gaussian_walk[scaled_t_range], label = \"ctₖ\", color = :blue, alpha = alpha)\nrhs_plt = plot(c^H .* gaussian_walk[t_range], label = \"c^H\", color = :blue, alpha = alpha)\nfor n = 1:ntrials - 1\n    starting_t = rand(100:500)\n    t_range .= collect(range(starting_t, length = 20, step = 100))\n    scaled_t_range .= round.(Int64, c .* t_range)\n    plot!(lhs_plt, gaussian_walk[scaled_t_range], label = nothing, color = :blue, alpha = alpha)\n    plot!(rhs_plt, c^H .* gaussian_walk[t_range], label = nothing, color = :blue, alpha = alpha)\nend\t\t\nplot((lhs_plt, rhs_plt)..., layout = (2, 1))","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"These plots are not perfectly similar - we're only using 200 samples in this case - but hopefully this scaling property is clear enough. When we scale time by c, if we scale our output by c^H we obtain a process that is statistically similar.","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Now let's try with something that does not have this nice scaling property, e.g. sin(x_i) for i = 1:3000:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"X = sin.(1:3000)\nstarting_t = rand(100:500)\nt_range = collect(range(starting_t, length = 20, step = 100))\nscaled_t_range = round.(Int64, c .* t_range)\nlhs_plt = plot(X[scaled_t_range], label = \"ctₖ\", color = :blue, alpha = alpha)\nrhs_plt = plot(c^H .* X[t_range], label = \"c^H\", color = :blue, alpha = alpha)\nfor n = 1:ntrials - 1\n    starting_t = rand(100:500)\n    t_range .= collect(range(starting_t, length = 20, step = 100))\n    scaled_t_range .= round.(Int64, c .* t_range)\n    plot!(lhs_plt, X[scaled_t_range], label = nothing, color = :blue, alpha = alpha)\n    plot!(rhs_plt, c^H* X[t_range], label = nothing, color = :blue, alpha = alpha)\nend\t\t\nplot((lhs_plt, rhs_plt)..., layout = (2, 1))","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Now the distributions look very different! If we try to calculate the Hurst exponent of sin(x) we will get very strange results. Under the hood, Hurst.jl considers the moment of the absolute tau-increments of the time series. Call this Q:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Q = EleftX(t+tau)-X(t)right","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"where tau represents some time delay. We assume that it is equal to a power law in tau:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Q=Ktau^H","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"We calculate the LHS for various values of tau and take logs:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"ln (Q) = H ln (tau)+ln (K)","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Our Hurst exponent H is just the coefficient of this linear regression. We can do this all using the functions in Hurst.jl:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"τ_range = 1:19 #not the best choice but good for visualising \nqth_moment_over_tau = [Hurst.qth_abs_moment(gaussian_walk, τ, 1) for τ ∈ τ_range]\nscatter(log.(τ_range), log.(qth_moment_over_tau), title = \"Gaussian walk\",\n    xlabel = \"ln(τ)\", label = \"ln qth absolute moment\")\nusing GLM\ngaussian_lm = lm(hcat(ones(length(τ_range)), log.(τ_range)), log.(qth_moment_over_tau))\na, b = coef(gaussian_lm)\nplot!(lnτ -> a + b*lnτ, log.(τ_range), label = \"Linear fit\")","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"It is easy to see that a lienar regression on this will be meaningful and will give a good estimate for H. ","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"However, if we do not have self-similar data, this linear relationship between ln (tau) and ln (Q) will not be present, and we will get invalid values for H:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"qth_moment_over_tau = [Hurst.qth_abs_moment(gaussian_increments, τ, 1) for τ ∈ τ_range]\nscatter(log.(τ_range), log.(qth_moment_over_tau), title = \"sin(x)\",\n    xlabel = \"ln(τ)\", label = \"ln qth absolute moment\");\nincrements_lm = lm(hcat(ones(length(τ_range)), log.(τ_range)), log.(qth_moment_over_tau))\nlnK, H = coef(increments_lm)","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"plot!(lnτ -> lnK + H*lnτ, log.(τ_range), label = \"Linear fit\")","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"A negative Hurst exponent is not possible, and only appears when we try to estimate one for data that is not scaling. If you try to calculate the Hurst exponent on data like this, Hurst.jl will return NaN:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"H, SD = hurst_exponent(gaussian_increments, τ_range)","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"At this point, hopefully you understand the motivation for the routine at the start of this page:","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Calculate Q = [Hurst.qth_abs_moment(X, τ, q) for τ in τ_range]\nCheck plot(log.(τ_range), log.(Q))","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"If the plot isn't roughly linear, you have a problem and you will not get good estimates for H.","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"q = 1.\nQ = [Hurst.qth_abs_moment(gaussian_increments, τ, q) for τ in τ_range]\nplt = scatter(log.(τ_range), log.(Q), label = \"data\")\nnasty_lm = lm(hcat(ones(length(τ_range)), log.(τ_range)), log.(Q))\na, b = coef(nasty_lm)\nplot!(plt, lnτ -> a + b*lnτ, log.(τ_range), label = \"Linear fit\")\nplt\n#not linear!","category":"page"},{"location":"troubleshooting/","page":"Troubleshooting","title":"Troubleshooting","text":"Q = [Hurst.qth_abs_moment(gaussian_walk, τ, q) for τ in τ_range]\nplt = scatter(log.(τ_range), log.(Q), label = \"data\")\nnice_lm = lm(hcat(ones(length(τ_range)), log.(τ_range)), log.(Q))\na, b = coef(nice_lm)\nplot!(plt, lnτ -> a + b*lnτ, log.(τ_range), label = \"Linear fit\")\nplt\n#much better","category":"page"},{"location":"ref/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"ref/","page":"Reference","title":"Reference","text":"","category":"page"},{"location":"ref/","page":"Reference","title":"Reference","text":"Modules = [Hurst]","category":"page"},{"location":"ref/#Hurst.generalised_hurst_exponent-Tuple{Any, Any, Any}","page":"Reference","title":"Hurst.generalised_hurst_exponent","text":"generalised_hurst_exponent(X, τ_range, q)\n\nCalculate the generalised Hurst exponent of the series X with absolute moment q over the range τ_range along with its standard error.\n\nSee also hurst_exponent.\n\nExamples\n\njulia> X = accumulate(+, randn(1000));\n\njulia> generalised_hurst_exponent(X, 1:19, 0.5);\n\n\n\n\n\n","category":"method"},{"location":"ref/#Hurst.generalised_hurst_range-Tuple{Any, Any, Any}","page":"Reference","title":"Hurst.generalised_hurst_range","text":"generalised_hurst_range(X, τ_range, q_range)\n\nCalculate the generalised Hurst exponent (GHE) of the series X with absolute moments q_range over the range τ_range, along with its standard error.\n\nReturns a (length(q_range), 2) matrix where the first column contains the values of the GHE and the second column contains the standard errors.\n\nSee also hurst_exponent.\n\nExamples\n\njulia> X = accumulate(+, randn(1000));\n\njulia> q_range = 0.:0.1:1.; tau_range = 1:19;\n\njulia> generalised_hurst_range(X, tau_range, q_range);\n\n\n\n\n\n","category":"method"},{"location":"ref/#Hurst.hurst_exponent-Union{Tuple{T}, Tuple{Vector{T}, Any}} where T<:Real","page":"Reference","title":"Hurst.hurst_exponent","text":"hurst_exponent(X, τ_range)\n\nCalculate the Hurst exponent of the series X over the range τ_range along with its standard error.\n\nSee Buonocore et al. 2016.\n\nExamples\n\njulia> X = accumulate(+, randn(1000));\n\njulia> isapprox(hurst_exponent(X, 1:19)[1], 0.5, atol = 0.1)\ntrue\n\n\n\n\n\n","category":"method"},{"location":"ref/#Hurst.zeta_estimator_range-Tuple{Any, Any, Any}","page":"Reference","title":"Hurst.zeta_estimator_range","text":"zeta_estimator_range(X, τ_range, q_range)\n\nCalculate zeta (q) that satifies:\n\nln left(EleftX(t+tau)-X(t)^qright ight)=zeta(q) ln (tau)+ln (K(q))\n\nfor some series X(t), over the vector q_range. \n\nReturns a (length(q_range), 2) matrix where the first column contains the values of the zeta(q) for different q and the second column contains the standard errors.\n\nSee also hurst_exponent.\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Hurst","category":"page"},{"location":"#Hurst","page":"Home","title":"Hurst","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package implements methods for estimating Generalised Hurst Exponents (GHEs).","category":"page"},{"location":"","page":"Home","title":"Home","text":"At the moment, the package only implements one method of estimation, and not the most state-of-the-art method at that. In time this will be updated - the goal of the package is to be allow the user to flexibly calculate GHEs in whatever way is most appropriate for the task at hand.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The package is designed to be fast and to facilitate the kind on analysis often seen in the literature. For example, one can calculate the normal Hurst exponent directly:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Hurst\nX = accumulate(+, randn(10000));\n@time H = hurst_exponent(X, 1:19)","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Hurst\nX = accumulate(+, randn(10000));\n@time H = hurst_exponent(X, 1:19)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Or, one can calculate the GHEs for a wide variety of moments:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Hurst\nX = accumulate(+, randn(10000));","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Hurst\ntau_range = 1:19\nq_range = 0.1:0.1:2.\ngeneralised_hurst_range(X, tau_range, q_range)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Hurst exponents (generalised or not) are calculated by performing a regression across a range of values of tau. It is important to be aware of these values as they can have a significant impact on the results (see here). As a result, these values are never supplied by default in functions and must be provided explicitly by the user. Users interest in the details of the calculation are encouraged to look at the above paper and its references.","category":"page"}]
}
